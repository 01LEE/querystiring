const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
const FIleStore = require('session-file-store')(session)

var app = express()

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FIleStore()
}))


app.get('/', function (req, res, next) {
    if(req.session.num == undefined){
    req.session.num = 1;
    } else {
        req.session.num += 1;
    }
    res.send(`Views : ${req.session.num}`);
})

app.listen(4000, function(){
    console.log('complate');
})