let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');

let bodyParser = require("body-parser");
let mysql=require("mysql");


let index = require('./routes/index');
let users = require('./routes/users');
let main = require('./routes/main');



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
    database:'airplane',
    port: 3307,
});



let a;
let query=connection.query("Select city from _from ",function (error,fields,result) {
    if (error) throw error;
     a=fields[0].city;
    console.log("fil "+a);
});



// app.get("/index1", function(request, response){
//     var b;
//     var a2=0;
//     var mas;
//     $( "#destination" ).change(function() {
//          b =$("#destination option:selected").val();
//         alert( "chose"+b );
//
//     });
//     let query=connection.query("SELECT _to.city FROM airplane.connector\n" +
//         "inner join _from on _from.id=from_id\n" +
//         "inner join _to on _to.id=to_id \n" +
//         "where _from.city like \""+ b + ";",function (error,fields,result) {
// // title:  st,!!!!!!!!!!!!!!!!!!
//         if (error) throw error;
//         console.log(fields[0].city);
//         mas =fields[0].city+",";
//         for(a2=1;a2<fields.length;a2++){
//             mas =mas+fields[a2].city+",";
//         }
//         mas=mas.substr(0, mas.length - 1);
//         console.log(mas);
//         a2=mas.split(",");
//         for(let i=0;i<a2.length;i++){
//             console.log("city from "+a2[i]);
//         }
//         //response.sendFile(path.join('/'));
//         response.render("index1", {
//             locationl:a2
//         });
//     });
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/index1', main);
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