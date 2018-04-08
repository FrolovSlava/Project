




var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var bodyParser = require("body-parser");
var mysql=require("mysql");
var $=require("jquery/dist/jquery.js");

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});



//var st;!!!!!!!!!!!!!!!
app.post("/form_handler", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    var b=request.body.first_name;
    console.log("b "+b);

    //st=b;!!!!!!!!!

        response.send(`${request.body.first_name}`);

});

var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'lab5',
    port: 3307,
});



var a;
var query=connection.query("Select * from lab5 where id > 30",function (error,fields,result) {
    if (error) throw error;
     a=fields[4].Name;
    console.log(a);
});


app.get("/index1", function(request, response){
var a1=0;
var c;
    var query=connection.query("Select * from lab5 where id > 30",function (error,fields,result) {
// title:  st,!!!!!!!!!!!!!!!!!!
        if (error) throw error;
        console.log(fields[0].Name);
        c =fields[0].Name+",";
for(a1=1;a1<5;a1++){
    c =c+fields[a1].Name+",";
}
       c=c.substr(0, c.length - 1);
        console.log(c);
        a1=c.split(",");
        for(var i=0;i<a1.length;i++){
            console.log("a1 "+a1[i]);
        }
        response.render("index1", {
            optionl:a1
        });
    });
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;