const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const exec = require("child_process").exec;
const bodyParser = require("body-parser");
const fs = require("fs");
const templates = require("./util/template");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket => {
    // console.log("New Connection:" + socket.id);
    socket.emit("startup", templates);
    socket.on("codeSumbission", compile => {
        // console.table(compile);
        const code = compile.code;
        const input = compile.input;
        fs.writeFileSync("./solution.cpp", code);
        fs.writeFileSync("./input.in", input);
        exec(`./prog `, function(err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            const result = { stdout, stderr };
            // console.table(result);
            socket.emit("verdict", result);
        });
    });
});

// app.post("/exec", function(req, res, next) {
//     // var response;
//     console.log(req.body.code);
//     const code = req.body.code;
//     exec("touch solution.cpp");
//     fs.writeFileSync("./solution.cpp", code);
//     exec(
//         "g++ solution.cpp -o submission && ./submission <in.txt >out.txt",
//         function(err, stdout, stderr) {
//             if (stderr) {
//                 // val=stderr.toString('utff8')
//                 // console.log(val);
//                 // res.send('<p>'+val+'</p>');
//                 response = stderr;
//             } else if (err) {
//                 // val=val.toString('utff8')
//                 // console.log(val);
//                 // res.send('<p>'+val+'</p>');
//                 response = err;
//             }
//         }
//     );
//     exec("cat out.txt", (err, stdout, stderr) => {
//         if (stdout) console.log(stdout);
//     });
//     exec("diff out.txt ans.txt", (err, stdout, stderr) => {
//         if (stdout === "") {
//             res.send("Accepted!");
//         } else {
//             res.send("Wrong answer");
//         }
//     });
// });

server.listen(3300, () => console.log("listening on 3300"));
