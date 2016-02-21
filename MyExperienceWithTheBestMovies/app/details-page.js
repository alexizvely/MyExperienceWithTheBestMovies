var vmModule = require("./details-view-model");
var frameModule = require("ui/frame");
var colorModule = require("color"); //for animation color change
var sound = require("nativescript-sound"); // for button click sound
var toastModule = require("nativescript-toast");  //for toast
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var soundEffect;// for button click sound

function onNavigatedTo(args) {
    console.log('details-page-> onNavigatedTo');
    var page = args.object;
    var data = vmModule.viewModel;
    data.selectedMovie = args.object.navigationContext.selectedMovie;
    page.bindingContext = vmModule.viewModel;
    console.log("Selected movie: " + args.object.navigationContext.selectedMovie);


    //on load animation
    var viewToAppear = page.getViewById("detailsPage");
    var buttonToAppear = page.getViewById("experienceButton");
    viewToAppear.animate({ opacity: 1, duration: 1000 })
    .then(function () { return buttonToAppear.animate({ backgroundColor: new colorModule.Color("#fad417"), duration: 1000 }); })
    .then(function () { console.log("Animation finished"); })
    .catch(function (e) { console.log(e.message); });
    //--------------------

    //loading sound for btn click
    soundEffect = sound.create("~/sounds/clickedSound.mp3");
    //-----------------------
}

exports.onNavigatedTo = onNavigatedTo;

// button tapped (sound)
function experienceButtonTapped () {
    console.log('experienceButtonTapped');
    soundEffect.play();
    topmost.navigate("my-experience-page");
}
exports.experienceButtonTapped = experienceButtonTapped;
//--------------------

//sample gestures - doubleTap, longPress, Swipe also declaired in XML of text field here
function increaseFontSize(args) {
    console.log('longPress');
	args.object.fontSize += 1;
    makeToast("Font increased");
}
exports.increaseFontSize = increaseFontSize;

function decreaseFontSize(args) {
    console.log('doubleTap');
	args.object.fontSize -= 1;
    makeToast("Font decreased");
}
exports.decreaseFontSize = decreaseFontSize;
//--------------------------

function navigateWithSwipe(args){
    console.log('swipe gesure detected');
    if(args.direction == 1) {
         experienceButtonTapped();
    }
}
exports.navigateWithSwipe = navigateWithSwipe;