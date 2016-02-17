//var vmModule = require("./main-view-model");
// function pageLoaded(args) {
//     var page = args.object;
//     page.bindingContext = vmModule.mainViewModel;
// }

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = page.navigationContext;
}
exports.onNavigatedTo = onNavigatedTo;