var vmModule = require("./details-view-model");
var frameModule = require("ui/frame");

function onNavigatedTo(args) {
    var page = args.object;
    page.bindingContext = vmModule.viewModel;
    console.log("Selected movie: " + args.object.navigationContext.selectedId);
}

exports.onNavigatedTo = onNavigatedTo;
