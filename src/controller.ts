var express=require('express')
var url = require('url');
var path = require('path');
var sql = require('mysql');
var exec = require("child_process").exec;
var bodyParser = require('body-parser')
const app=express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/input.html')); // Send HTML file
});

app.get('/getResult',(req,res,next)=>{
    console.log(req.query.text)
    var dataString=""
    var child=exec(`python scripty.py ${req.query.text}`)
    child.stdout.on('data', function(data){
        console.log(data)
        dataString += data.toString();
      });
      child.stdout.on('end', function(){
        console.log('result=',dataString);
        res.send(dataString)
      })
      child.stdin.end();
})
var port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("Server Active At "+port);  
})
