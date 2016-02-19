var vmModule = require("./main-view-model");
var everlive = require("./app.js").everlive;
var tnsfx = require('nativescript-effects'); //plugin for animation
var page;

function pageLoaded(args) {
    console.log('main-page-> pageLoaded');
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    var activities = everlive.data('Movie');

    activities.get(null, function(data) {
        console.log('Telerik Backend Services works! Here is the first movie uploaded there: ' + JSON.stringify(data));
    }, function(err) {
        console.log(err.message);
    })




//added zoom in on start animation 
    var screen = page.getViewById("mainScreen");
    screen.opacity = 0;
    screen.fadeIn(1200);
};

exports.pageLoaded = pageLoaded;
exports.onLvItemTap = vmModule.mainViewModel.onLvItemTap;
exports.onButtonItemTap = vmModule.mainViewModel.onButtonItemTap;
