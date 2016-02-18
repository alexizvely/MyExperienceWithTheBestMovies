var vmModule = require("./main-view-model");
var page;

function pageLoaded(args) {
    console.log('main-page-> pageLoaded');
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;
};

exports.pageLoaded = pageLoaded;
exports.onLvItemTap = vmModule.mainViewModel.onLvItemTap;
