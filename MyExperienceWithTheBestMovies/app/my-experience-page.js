var vmModule = require("./my-experience-view-model");
var frameModule = require("ui/frame");
var view = require("ui/core/view");       //for getviewbyId
var colorModule = require("color"); //for animation color change
var cameraModule = require("camera");    // for camera
var imageModule = require("ui/image");   //for images
var dialogs = require("ui/dialogs");      //for alerts
var toastModule = require("nativescript-toast");  //for toast
var sound = require("nativescript-sound"); // for button click sound
var soundEffect;// for button click sound
var badInputEffect;// for bad input sound

var imageBoxXml;

var page;
var vm = vmModule.viewModel;

function onNavigatedTo(args) {
  console.log('my-experience-page-> onNavigatedTo');
  page = args.object;
  var data = vmModule.viewModel;
  data.selectedMovie = args.object.navigationContext.selectedMovie;
  page.bindingContext = vmModule.viewModel;
  console.log("my-experience-page-> onNavigatedTo: Selected movie: " + args.object.navigationContext.selectedMovie);



  imageBoxXml = view.getViewById(page, "image");
//    imageBoxXml.src ="~/images/imagePlaceholder.png";

     //on load animation
    animateChangeColorButtonWithId("pictureButton", "#fad417", 1500);
    animateChangeColorButtonWithId("noteButton", "#fad417", 1500);

     //loading sound for btn click
    soundEffect = sound.create("~/sounds/clickedSound.mp3");
    badInputEffect = sound.create("~/sounds/negativeSound.mp3");
    //-----------------------
};

function onTakePictureTap(args){
  console.log("my-experience-page -> onTakePictureTap");
	soundEffect.play();

	dialogs.confirm(
	{
	  title: "Take picture",
	  message: "Take picture using device's camera?",
	  okButtonText: "OK",
	  cancelButtonText: "Cancel"
	}
	).then(function (result) {
	  		console.log("my-experience-page -> onTakePictureTap: Dialog result: " + result);

		  	if (result) {
				cameraModule.takePicture({width: 200, height: 200, keepAspectRatio: true})
				.then(function(picture) {
			    imageBoxXml.imageSource = picture;
			    console.log('my-experience-page -> onTakePictureTap: picture shown');

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
  console.log("my-experience-page -> saveNote");
	soundEffect.play();
	dialogs.confirm({
	  title: "Note",
	  message: "Would you like to add a note?",
	  okButtonText: "Yes, please.",
	  cancelButtonText: "No, thanks!",
	}).then(function (result) {
	  console.log("my-experience-page -> saveNote: Dialog result: " + result);

	  if (result) {
			var noteWriteField = view.getViewById(page, "noteWriteField");
			var note = noteWriteField.text;
			if (note.length > 0) {
        var list = view.getViewById(page,'noteList')
			    vm.notes.push(note);
			    noteWriteField.text="";
        console.log("my-experience-page -> saveNote: note pushed successfully: " + note);
				makeToast("Note added.");
        list.refresh();
			} else {
				badInputEffect.play();
        console.log("my-experience-page -> saveNote: note has no text");
				dialogs.alert("Please enter a note.").then(function (result) {
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
    console.log("my-experience-page -> makeToast");
    var toast = toastModule.makeText(text);
    toast.show();
}

function animateChangeColorButtonWithId(buttonId, color, duration){
    console.log("my-experience-page -> animateChangeColorButtonWithId");
    var btnToAppear = page.getViewById(buttonId);
    btnToAppear.animate({ backgroundColor: new colorModule.Color(color), duration: duration })
    .catch(function (e) { console.log("my-experience-page -> animateChangeColorButtonWithId" + e.message); });
}

exports.onNavigatedTo = onNavigatedTo;
