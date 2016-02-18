var vmModule = require("./my-experience-view-model");
var frameModule = require("ui/frame");

function onNavigatedTo(args) {
  console.log('my-experience-page-> onNavigatedTo');
  var page = args.object;
  var data = vmModule.viewModel;
  data.selectedMovie = args.object.navigationContext.selectedMovie;
  page.bindingContext = vmModule.viewModel;
  console.log("Selected movie: " + args.object.navigationContext.selectedMovie);
}

exports.onNavigatedTo = onNavigatedTo;
