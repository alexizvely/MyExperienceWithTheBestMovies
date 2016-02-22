var frameModule = require("ui/frame");
var observable = require("data/observable").Observable;

var viewModel = new observable({
    selectedMovie: {},
    pageTransitionToExperience: pageTransitionToExperience
});

function pageTransitionToExperience() {
    console.log('details-page -> pageTransitionToExperience');
    var navigationEntry = {
            moduleName: "./my-experience-page",
            context: {
              selectedMovie: viewModel.selectedMovie
            },
            animated: true,
            navigationTransition: {
                transition: "flip ",
            }
        };
      var topmost = frameModule.topmost();
      topmost.navigate("my-experience-page");
};

exports.viewModel = viewModel;
