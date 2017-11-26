var express= require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var molog = require('mongoose');
var server=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://annobot:badalhr@ds119736.mlab.com:19736/chat',{useMongoClient: true});
//schema
var chat= new mongoose.Schema({
  room:String,
  name:String,
  msg:String

});

var Chat =mongoose.model('Chat',chat);






molog.Promise = global.Promise;
molog.connect('mongodb://annobot:badalhr@ds121726.mlab.com:21726/log',{useMongoClient: true});
//schema
var log= new molog.Schema({
  user:String,
  pass:String

});

var Log =molog.model('Log',log);








server.set('view engine','ejs');
//server.use(upload());
server.use(bodyParser.json());

server.get('/te/:room',function(req,res){
var di=Chat.find({'room':req.params.room},function(err,data){
if(err) console.log(err);
data.sort( {"_id.$old":1} );
console.log(data);
res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));

});
});



server.post('/dr',urlencodedParser,function(req,res){
  console.log(req.body);
  var dat=req.body;
  var pone=Log({user:dat.user,pass:dat.pass}).save(
  function(err){
    if(err) console.log(err);
    console.log('done');});

res.render('index');
});

server.post('/check',urlencodedParser,function(req,res){

  var dat=req.body;

    var di=Log.find({"user":dat.user},function(err,data){
    if(err) console.log(err);
    console.log(data.user);
    console.log(data[0].pass);
    if (data[0].user) {


    if(data[0].pass==dat.pass){
console.log('success');
      res.render('main');
    }

else{res.render('error');}}
else{res.render('error');}
    });

});

server.get('/',function(req,res){
  res.render('index');

});

server.get('/add',function(req,res){
  res.render('test');

});

server.listen(process.env.PORT || 3000);
console.log('made it');
