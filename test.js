console.log("My Express-Session Application\nLoading...\nDone! Thanks for your patience.")
process.stdout.write("hello: \nDamilola Adegunwa");
const express = require('express');
const app = express();

function consoleLog1(req, res, next) {
    console.log("log from console #1");
    req.author = "consoleLog1";
    // const err = new Error("some error occurred. just for testing pls ignore");
    // if(err)
    // {
    //     next(err);
    // }
    next();
    //it looks like everything after the next method goes into a stack (lifo)
    console.log("(after the 'next' function)log from console #1");
}
function consoleLog2(req, res, next) {
    console.log("log from console #2");
    req.author = "consoleLog2";
    next();
    console.log("(after the 'next' function)log from console #2");
}

function consoleLog3(req, res, next) {
    next();
     
    // new Promise(function(resolve, reject) {
    //     for(let i = 0; i < 2_000_000_000; i++)
    //     {
            
    //     }
    //     for(let j = 0; j < 2_000_000_000; j++)
    //     {

    //     }
    //     for(let k = 0; k < 2_000_000_000; k++)
    //     {

    //     }
    //     console.log("log from console #3");
    //     req.author = "consoleLog3";
    // });
    // console.log("log from console of req.author:" + req.author);
    // promise.then(()=>{
    //     // console.log("log from console #3");
    //     // req.author = "consoleLog3";
    //     //next();
    // });
}

function sampleHandler1(req, res, next) {
    res.locals.line1 = `<p><h1>my express-session application header</h1></p>`;
    //req.author = "sampleHandler1";
    next();
}
function sampleHandler2(req, res, next) {
    res.send(req.author + " | " + res.locals.line1 + `<h1>body of my express-session application</h1>`);
}

function errorHandler (err, req, res, next) {
    if(err)
    {
        res.send(err.message);
    }
}

app.use(consoleLog1);
app.use(consoleLog2);
app.use(consoleLog3);
app.get('/', sampleHandler1, sampleHandler2);
app.use(errorHandler);
app.listen(3000);