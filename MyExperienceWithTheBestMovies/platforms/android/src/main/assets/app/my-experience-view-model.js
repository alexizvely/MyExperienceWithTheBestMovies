var observable = require("data/observable").Observable;

var viewModel = new observable({
    selectedMovie: {},
    pictureList: [],
    notes: [],
    sliderValue: 1,
    minSliderValue: 0,
    maxSliderValue: 10
});

exports.viewModel = viewModel;
