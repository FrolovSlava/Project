let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require("body-parser");
let mysql = require("mysql");

// let index = require('./routes/index');
// let users = require('./routes/users');
// let main = require('./routes/main');
let routes = require('./routes/routes');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let urlencodedParser = bodyParser.urlencoded({
  extended: false
});

//app.use(express.static(path.join(__dirname, 'public'))); // отдам коня тому, кто пояснит, зачем это здесь
app.use('/', routes);
app.use('/index1', routes);
app.use('/admin', routes);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/views'));
// Обьединение


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'airplane',
    port: 3307,
});

app.post("/flight", function (request, response) { // не "объединение", а "квинтесенция"!!
    let answer= {};

    console.log("checkBox "+request.body.checkBox);
    console.log("destination1 "+request.body.destination1);
    console.log("dateDestination "+request.body.dateDestination);
    console.log("dateLocation "+request.body.dateLocation);
    console.log("adults "+request.body.adults);
    console.log("children "+request.body.children);
    console.log("locate "+request.body.locate);
    console.log("level "+request.body.level); // удалить после отладки, ибо консоль должна быть максимально чистой отвсякого ненужного дерьма

    connection.query('SELECT _from.city as F,GROUP_CONCAT(_to.city ) as T FROM airplane.connector' +
        ' inner join _from on _from.id=from_id ' +
        ' inner join _to on _to.id=to_id' +
        ' where _from.city like \'' +request.body.destination1+'\''+
        ' group by 1;', function (error,fields, result) {

      let to=fields[0].T.split(',');
    for(var i=0;i<to.length;i++){
      if(to[i]==request.body.locate){
          console.log("yes "+to[i]);
          answer.message="Билет заказан";
          break;
      }
      else{
          answer.message="Такого маршрута нет, выберите другой";
      }
    }
        response.send(answer)
    });
});


app.post("/car", function (request, response) { // не "объединение", а "квинтесенция"!!
    let answer= {};
    answer.message="Ваш автомобиль успешно заказан";
    console.log("cityCar "+request.body.cityCar);
    console.log("model "+request.body.model);
    console.log("dateRent "+request.body.dateRent);
    console.log("NumDays "+request.body.NumDays);
    response.send(answer)
});

app.post("/hotel", function (request, response) { // не "объединение", а "квинтесенция"!!
    let answer= {};
    answer.message="Ваш номер успешно заказан";
    console.log("cityHotel "+request.body.cityHotel);
    console.log("nameHotel "+request.body.nameHotel);
    console.log("checkInHotel "+request.body.checkInHotel);
    console.log("checkOutHotel "+request.body.checkOutHotel);
    console.log("typeOfEat "+request.body.typeOfEat);
    console.log("NumOfPeople "+request.body.NumOfPeople);
    response.send(answer)
});

app.post('/AddFlight', function(request, response) {
    let flag=1;
    let secFlag=1;
    console.log("NewLocation "+request.body.NewLocation);
    console.log("NewDestination "+request.body.NewDestination);
    if(request.body.NewLocation==""||request.body.NewDestination=="") {
        response.send({mes:'Вы не внесли город'});
    }
    else {
        connection.query('select * from _from;', function (error,fields, result) {
            for (let a1 = 0; a1 < fields.length; a1++) {
                if(fields[a1].city==request.body.NewDestination){
                    flag=0;
                    break;
                }
                else{
                    flag=fields.length;
                }
            }
            if(flag>0){
              flag=flag+1;
                connection.query('INSERT INTO _from (id, city) VALUES (?, ?);',
                    [flag, request.body.NewDestination], function (err, results, fields) {
                        if (err) throw err;
                    });
            }
        });
        connection.query('select * from _to;', function (error,fields, result) {
            for (let a1 = 0; a1 < fields.length; a1++) {
                if(fields[a1].city==request.body.NewLocation){
                    secFlag=0;
                    break;
                }
                else{
                    secFlag=fields.length;
                }
            }
            if(secFlag>0){
                secFlag=secFlag+1;
                console.log("secFlag 1 "+secFlag);
                connection.query('INSERT INTO _to (id, city) VALUES (?, ?);',
                    [secFlag, request.body.NewLocation], function (err, results, fields) {
                        if (err) throw err;
                    });
                connection.query('INSERT INTO connector (id,from_id, to_id) VALUES (?,?, ?);',
                    [ ,flag, secFlag], function (err, results, fields) {
                        console.log("secFlag "+secFlag);
                        console.log("flag "+flag);
                        if (err) throw err;
                        response.send({mes:'Маршрут добавлен'});
                    });
            }
        });
    }
});

app.post('/EditFlight', function(request, response) {
    if(request.body.NewDestination!=""&&request.body.destination1!="default") {
        connection.query('UPDATE airplane._from SET city = ? WHERE city = ?',
            [request.body.NewDestination, request.body.destination1], function (error, fields, result) {
             response.send({mes:'Город изменен'});
            });
    }
    else if(request.body.NewLocation!=""&&request.body.locate!="default") {
        connection.query('UPDATE airplane._to SET city = ? WHERE city = ?',
            [request.body.NewLocation, request.body.locate], function (error, fields, result) {
             response.send({mes:'Город изменен'});
            });
    }
    else response.send({mes:'Не ввели город'});
});

app.post('/DeleteFlight', function(request, response) {
    if(request.body.NewDestination!=""&&request.body.destination1!="default") {
        connection.query('UPDATE airplane._from SET city = ? WHERE city = ?',
            [request.body.NewDestination, request.body.destination1], function (error, fields, result) {
                response.send({mes:'Город изменен'});
            });
    }
    else if(request.body.NewLocation!=""&&request.body.locate!="default") {
        connection.query('UPDATE airplane._to SET city = ? WHERE city = ?',
            [request.body.NewLocation, request.body.locate], function (error, fields, result) {
                response.send({mes:'Город изменен'});
            });
    }
    else response.send({mes:'Не ввели город'});
});

app.post("/form_handler", urlencodedParser, function (request, response) {
  if (!request.body) return response.sendStatus(400);
  console.log(request.body);
  let b = request.body.first_name;
  console.log("b " + b);
  response.send(`${request.body.first_name}`);
});


app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Server running at http://localhost:3000/');
});

module.exports = app; 