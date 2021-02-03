const express = require('express');
const app=express();
const bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/digitronsPractical';
mongoose.connect(mongoDB,{ useUnifiedTopology : true , useNewUrlParser : true});
var db = mongoose.connection;
var bookedslot =  require('./model/bookedslot');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

app.get('/bookedlist', async function(req,res){
  console.log("bookedlist",req.query.date);
  try{
    const resdata = await bookedslot.find({'date': req.query.date});
    res.send(resdata);
  } catch(error){  res.send({}); }
});


app.post('/book',async function(req,res){
  console.log("book api",req.body);
  try{
    const resdata = await bookedslot.create(req.body);
    res.send(resdata);
  } catch(error){
    res.send({});
  }
});

app.post('/booked',async function(req,res){
  console.log("book api",req.body);
  try{
    const resdata = await bookedslot.updateOne({ _id : req.body._id},{$set : { firstname : req.body.firstname, lastname : req.body.lastname, phonenumber : req.body.phonenumber}});
    res.send(resdata);
  } catch(error){
    res.send({});
  }
});
