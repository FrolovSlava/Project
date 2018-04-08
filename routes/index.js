var express = require('express');
var router = express.Router();

var mysql=require("mysql");
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'lab5',
    port: 3307,
});

connection.connect();

var query=connection.query("Select id,Name from lab5 where id > 30");


/* GET home page. */
router.get('/', function(req, res, next) {

res.render('index', { title: query});



});
connection.end();
module.exports = router;
