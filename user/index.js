var DateBase = require('DateBase');


function  User(name) {
    this.name = name;
}

User.prototype.hello = function (who) {
    console.log(DateBase.getPhrases("Hello") + "," + who.name);
}

console.log("user.js is required!");

module.exports= User;
