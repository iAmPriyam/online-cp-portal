const socket = io();

const inputTab = document.querySelector(".result-btn.input");
const inputArea = document.querySelector(".input-area");
const outputTab = document.querySelector(".result-btn.output");
const outputArea = document.querySelector(".output-area");
const runButton = document.querySelector(".run-btn");
const textEditor = document.querySelector("#editor");
const switchToInputArea = () => {
    inputTab.setAttribute("style", "background:white;");
    inputArea.setAttribute("style", "display:block;");
    outputTab.setAttribute("style", "background:#f3dcdc;");
    outputArea.setAttribute("style", "display:none;");
};

const switchToOututArea = () => {
    inputTab.style.background = "#f3dcdc";
    inputArea.style.display = "none";
    outputArea.style.display = "block";
    outputTab.style.background = "white";
};

textEditor.addEventListener("keypress", e => {
    code = textEditor.textContent;
});

inputTab.addEventListener("click", e => {
    e.preventDefault();
    switchToInputArea();
});

outputTab.addEventListener("click", e => {
    e.preventDefault();
    switchToOututArea();
});

runButton.addEventListener("click", e => {
    e.preventDefault();
    console.log("run");
    let code = textEditor.textContent;
    console.log(code);
    const input = inputArea.getElementsByClassName("input-span")[0].textContent;
    const compile = { code, input };
    console.table(compile);
    socket.emit("codeSumbission", compile);
});

socket.on("welcome", message => {
    console.log(message);
});

socket.on("verdict", result => {
    switchToOututArea();
    const output = result.stdout || result.stderr;
    outputArea.getElementsByClassName("output-span")[0].textContent = output;
    console.table(output);
});

// const executeSubmission = code => {
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
// };
