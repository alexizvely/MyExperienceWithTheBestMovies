var frameModule = require("ui/frame");
var observable = require("data/observable").Observable;

var viewModel = new observable({
    selectedMovie: {},
    pageTransitionToExperience: pageTransitionToExperience
});

function pageTransitionToExperience() {
    console.log('details-page -> pageTransitionToExperience');
    console.log('details-page -> pageTransitionToExperience: ' + viewModel.selectedMovie.title);
    var movie = viewModel.selectedMovie;
    var navigationEntry = {
            moduleName: "my-experience-page",
            context: {
              selectedMovie: movie
            },
            animated: true,
            navigationTransition: {
                transition: "flip ",
            }
        };
      var topmost = frameModule.topmost();
      topmost.navigate(navigationEntry);
};

exports.viewModel = viewModel;
