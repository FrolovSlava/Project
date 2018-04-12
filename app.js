let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let bodyParser = require("body-parser");
let mysql=require("mysql");
let $=require("jquery/dist/jquery.js");

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// создаем парсер для данных application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(express.static(__dirname+'/views'));
// Обьединение


//let st;!!!!!!!!!!!!!!!
app.post("/form_handler", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    let b=request.body.first_name;
    console.log("b "+b);

    //st=b;!!!!!!!!!

        response.send(`${request.body.first_name}`);

});

let connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'lab5',
    port: 3307,
});



let a;
let query=connection.query("Select * from lab5 where id > 30",function (error,fields,result) {
    if (error) throw error;
     a=fields[4].Name;
    console.log(a);
});


app.get("/index1", function(request, response){
let a1=0;
let c;
    let query=connection.query("Select * from lab5 where id > 30",function (error,fields,result) {
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
        for(let i=0;i<a1.length;i++){
            console.log("a1 "+a1[i]);
        }
        //response.sendFile(path.join('/'));
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
    let err = new Error('Not Found');
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