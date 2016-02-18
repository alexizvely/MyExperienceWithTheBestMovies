var application = require("application");
application.mainModule = "main-page";
application.cssFile = "./app.css";
application.start();
var Everlive = require('./everlive.all.min');
var el = new Everlive('ps0ec98tdgp4jhl6');

exports.everlive = el;
