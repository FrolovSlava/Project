var express = require('express');
var router = express.Router();

/* GET users listing. */

var mysql=require("mysql");

let connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'airplane',
    port: 3307,
});

router.get("/", function(request, response){
    let a1;
    let c=[];
    let toMas=[];
    let resulter;
    let kol;
    let query=connection.query("SELECT _from.city as from1,_to.city as to1 FROM airplane.connector\n" +
        "inner join _from on _from.id=from_id\n" +
        "inner join _to on _to.id=to_id ;" ,function (error,fields,result) {

        if (error) throw error;
        for(a1=0;a1<fields.length;a1++){
            c[a1]=fields[a1].from1;
        }

        for(a1=0;a1<fields.length;a1++){
            toMas[a1] =fields[a1].to1;
        }
        let query1=connection.query("select count(id) as count from _from;",function (error,fields1,result) {
            kol=fields1[0].count;
            console.log("kol "+kol);
        });

        // for(let i =0 ;;i++) {
        //    for (let j = 0;;j++) {
        //        if
        //        resulter[]
        //    }
        // }
        //
        // resulter =


        console.log("c "+c);
        console.log("toMas " +toMas);

        response.render("index1", {
            optionl:c,
            locationl:toMas
        });
    });
});




module.exports = router;