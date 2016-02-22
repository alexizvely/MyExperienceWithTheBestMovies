var application = require("application");
var Everlive = require('./everlive.all.min');
var el = new Everlive('ps0ec98tdgp4jhl6');
// var dbmanager = require("./dbmanager");
var platformModule = require("platform");

application.mainModule = "main-page";
application.cssFile = "./app.css";

global.everlive = el;
// global.dbmanager = new dbmanager.DBManager();
global.deviceID = platformModule.device.uuid;
global.currentUser = {};

function startApplication(){
    console.log('app start -> ' + global.deviceID);
    application.mainModule = "main-page";
    application.cssFile = "./app.css";
    application.start();
};

startApplication();
