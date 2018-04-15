// var express = require('express');
// var router = express.Router();
//
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);
//
// let mysql=require("mysql");
// let connection=mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'1234',
//     database:'airplane',
//     port: 3307,
// });
//
// $( "#destination" ).change(function() {
//     let b =$("#destination option:selected").val();
//     alert( "chose"+b );
//
//     //
//     // app.get("/index1", function(request, response){
//     // var b;
//     // var a2=0;
//     // var mas;
//
//     let query=connection.query("SELECT _to.city FROM airplane.connector\n" +
//         "inner join _from on _from.id=from_id\n" +
//         "inner join _to on _to.id=to_id \n" +
//         "where _from.city like \""+ b + ";",function (error,fields,result) {
// // title:  st,!!!!!!!!!!!!!!!!!!
//         if (error) throw error;
//
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
//         // response.render("index1", {
//         //     locationl:a2
//         // });
//     });
// });
//
// module.exports = router;
