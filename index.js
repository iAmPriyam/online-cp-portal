const express = require('express');
const path = require('path');
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

app.use(bodyParser.urlencoded({extended:false}));



const executeSubmission=(code)=>{
    exec('touch solution.cpp');
    fs.writeFileSync('./solution.cpp',code);
    exec('g++ solution.cpp -o submission && ./submission <in.txt >out.txt',function (err,stdout,stderr) {
        
        if(stderr){
            // val=stderr.toString('utff8')
            // console.log(val);
            // res.send('<p>'+val+'</p>');
            response=stderr;
        }
        else if(err){
            // val=val.toString('utff8')
            // console.log(val);
            // res.send('<p>'+val+'</p>');
            response=err;
        }
    });
    exec("cat out.txt",(err,stdout,stderr) =>{
        if(stdout)
            console.log(stdout);
    });
    exec("diff out.txt ans.txt", (err,stdout,stderr)=>{
        if(stdout===''){
            res.send("Accepted!");
        }
        else{
            res.send("Wrong answer");
        }
    })
}

app.get('',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/exec',function (req,res,next) {
    // var response;
    console.log(req.body.code)
    const code = req.body.code;
    exec('touch solution.cpp');
    fs.writeFileSync('./solution.cpp',code);
    exec('g++ solution.cpp -o submission && ./submission <in.txt >out.txt',function (err,stdout,stderr) {
        
        if(stderr){
            // val=stderr.toString('utff8')
            // console.log(val);
            // res.send('<p>'+val+'</p>');
            response=stderr;
        }
        else if(err){
            // val=val.toString('utff8')
            // console.log(val);
            // res.send('<p>'+val+'</p>');
            response=err;
        }
    });
    exec("cat out.txt",(err,stdout,stderr) =>{
        if(stdout)
            console.log(stdout);
    });
    exec("diff out.txt ans.txt", (err,stdout,stderr)=>{
        if(stdout===''){
            res.send("Accepted!");
        }
        else{
            res.send("Wrong answer");
        }
    })
})

app.listen(3300,()=>console.log('listening on 3300'));