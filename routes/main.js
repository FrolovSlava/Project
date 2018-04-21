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
            //console.log(`${a1}: ${fields[a1].to1}`);
            //console.log("res"+ result)
        }
        let locationQuety = connection.query("select _from.city from _from;",function (error, result, fields) {
//получить все названия мест отправки
            let ways = {};
            //result = JSON.parse(JSON.stringify(result));
            result.forEach(el=> {
                ways[el.city] = [];
            })

            Object.keys(ways).forEach(el=> {
                let destionQuery = connection.query("SELECT _to.city FROM airplane.connector\n" +
                `inner join _from on _from.id=from_id\n` +
                `inner join _to on _to.id=to_id where _from.city like '${el}';`, function (error, result, fields) {
                    result.forEach(p => {
                        ways[el].push(p.city)
                    })
//вернуть ways
                    console.log(ways);
                });
                })
        });



        //
        // arr2.forEach{}
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