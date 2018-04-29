var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'airplane',
    port: 3307,
});

router.get("/index1", function (request, response) {
    let a1;
    let froms = [];
    let tos = [];
    let car = [];
    let hotels = [];

    connection.query("select _from.city from _from;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            froms[a1] = fields[a1].city;
        }
        console.log(froms);
    });

    connection.query("select model from airplane.car;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            car[a1] = fields[a1].model;
        }
    });

    connection.query("select hotelName from hotel;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            hotels[a1] = fields[a1].hotelName;
        }
        console.log(hotels);
    });

    connection.query("select _to.city from _to;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            tos[a1] = fields[a1].city;
        }
        console.log(tos);
        //response.render('index1')
        response.render("index1", {
            optionl: froms,
            locationl: tos,
            car:car,
            hotel:hotels
        });
    });
});



router.get('/', function(req, res, next) {
    res.render('index', { title: 'query'});
});





router.get("/admin", function (request, response) {
    let a1;
    let froms = [];
    let tos = [];
    let car = [];
    let hotels = [];

    connection.query("select _from.city from _from;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            froms[a1] = fields[a1].city;
        }
    });

    connection.query("select model from airplane.car;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            car[a1] = fields[a1].model;
        }
    });

    connection.query("select hotelName from hotel;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            hotels[a1] = fields[a1].hotelName;
        }
    });

    connection.query("select _to.city from _to;", function (error, fields, result) {
        if (error) throw error;
        for (a1 = 0; a1 < fields.length; a1++) {
            tos[a1] = fields[a1].city;
        }
        //response.render('index1')
        response.render("admin", {
            optionl: froms,
            locationl: tos,
            car:car,
            hotel:hotels
        });
    });
});

module.exports = router;