<<<<<<< HEAD
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
=======
var vmModule = require("./main-view-model");
var observable = require("data/observable").Observable;
var observableArray = require("data/observable-array").ObservableArray;
var colorModule = require("color"); //for animation color change
var cameraModule = require("camera");    // for camera
var imageModule = require("ui/image");   //for images
var view = require("ui/core/view");       //for getviewbyId
var dialogs = require("ui/dialogs");      //for alerts
var toastModule = require("nativescript-toast");  //for toast
var sound = require("nativescript-sound"); // for button click sound

var soundEffect;// for button click sound
var badInputEffect;// for bad input sound
var page;
var imageBoxXml;

function onNavigatedTo(args) {
    page = args.object;
    page.bindingContext = pageData;

	imageBoxXml = view.getViewById(page, "image");
//    imageBoxXml.src ="~/images/imagePlaceholder.png";

     //on load animation
    animateChangeColorButtonWithId("pictureButton", "#fad417", 1500);
    animateChangeColorButtonWithId("noteButton", "#fad417", 1500);

     //loading sound for btn click
    soundEffect = sound.create("~/sounds/clickedSound.mp3");
    badInputEffect = sound.create("~/sounds/negativeSound.mp3");
    //-----------------------
}
exports.onNavigatedTo = onNavigatedTo;

var pageData = new observable({
    pictureList: new observableArray([
    	// { img: "test1" },
     //    { img: "test2" },
     //    { img: "test3" } 
    ]),
    notes: new observableArray([]),
    "sliderValue": 5,
    "minValue": 0,
    "maxValue": 10
});


function onTakePictureTap(args){
	soundEffect.play();

	dialogs.confirm(
	{
	  title: "Take picture",
	  message: "Take picture using device's camera?",
	  okButtonText: "OK",
	  cancelButtonText: "Cancel"
	}
	).then(function (result) {
	  		console.log("Dialog result: " + result);
	  
		  	if (result) {
				cameraModule.takePicture({width: 200, height: 200, keepAspectRatio: true})
				.then(function(picture) {
			    imageBoxXml.imageSource = picture;
			    console.log('picture shown');

			 //    var imageModule = new imageModule.Image();
			 //    imageModule.imageSource = picture;
			 //    console.log("Result is an image source instance");

			 //    pageData.pictureList.push(imageModule);
				// console.log(pageData.pictureList.getItem(0));
			});
		}
	});	
}
exports.onTakePictureTap = onTakePictureTap;

function saveNote(args){
	
	soundEffect.play();

	dialogs.confirm({
	  title: "Note",
	  message: "Add note?",
	  okButtonText: "OK",
	  cancelButtonText: "Cancel",
	}).then(function (result) {
	  console.log("Dialog result: " + result);
	  
	  if (result) {
			var noteWriteField = view.getViewById(page, "noteWriteField");
			var note = noteWriteField.text;

			if (note.length > 0) {
			    pageData.notes.push({string: note});
			    noteWriteField.text="";
				makeToast("Note added.");
			} else {
				badInputEffect.play();
				dialogs.alert("Zero length notes not allowed!").then(function (result) {
					makeToast("Note scrapped.");
				});
			}
	    }
	});	
}
exports.saveNote = saveNote;

//sample gestures - longPress  to delete
// function deleteNote(args) {
//     console.log('longPress');
// 	var i = args.object;
// 	console.log(i);
// }
// exports.deleteNote = deleteNote;

function makeToast(text){
    var toast = toastModule.makeText(text);
    toast.show();
}

function animateChangeColorButtonWithId(buttonId, color, duration){
    var btnToAppear = page.getViewById(buttonId);
    btnToAppear.animate({ backgroundColor: new colorModule.Color(color), duration: duration })
    .catch(function (e) { console.log(e.message); });
}
>>>>>>> 1a5d771ca41386506addc82500c26a717eecb761
