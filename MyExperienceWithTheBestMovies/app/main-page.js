var vmModule = require("./main-view-model");
var everlive = require("./app.js").everlive;
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
};

exports.pageLoaded = pageLoaded;
exports.onLvItemTap = vmModule.mainViewModel.onLvItemTap;
