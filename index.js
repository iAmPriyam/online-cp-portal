const express = require('express');
const app = express();
// const router = express.Router();
const exec = require('child_process').exec;

executeSubmission=(solution)=>{
    var response='';
    exec('gcc '+solution+'.c -o submission && ./submission <in.txt >out.txt',function (err,stdout,stderr) {
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
        else{
            exec("cat out.txt",function(err,stdout,stderr){
                // val=stdout.toString('utff8');
                // console.log(val);
                // res.send(val);
                response=stdout;
            })
        }
        console.log(response);
        
    });
    return response;
}

app.get('',function (req,res,next) {
    // var response;
    const solution='factorial';
    const response=executeSubmission(solution);
    console.log(response);
    res.send(response);
})

app.listen(3300);