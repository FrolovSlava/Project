var logger = require('logger')(module);
var DateBase = require('DateBase');
DateBase.connect();

var User = require('./user');

function  run() {
    var vasya = new User("Вася");
    var petya = new User("Петя");
    vasya.hello(petya);

    logger(DateBase.getPhrases("Run succsesful"));
}


if(module.parent){
    exports.run=run;
}
else{
    run();
}