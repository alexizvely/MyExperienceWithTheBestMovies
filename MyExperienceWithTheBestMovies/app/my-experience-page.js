var vmModule = require("./main-view-model");
var observable = require("data/observable").Observable;
var observableArray = require("data/observable-array").ObservableArray;
var cameraModule = require("camera");    // for camera
var imageModule = require("ui/image");   //for images
var view = require("ui/core/view");       //for getviewbyId
var dialogs = require("ui/dialogs");      //for alerts
var toastModule = require("nativescript-toast");  //for toast

var page;
var imageBoxXml;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = pageData;

	imageBoxXml = view.getViewById(page, "image");
    imageBoxXml.src ="~/images/imagePlaceholder.png";
}
exports.pageLoaded = pageLoaded;

var pageData = new observable({
    pictureList: new observableArray([
    	{ img: "test1" },
        { img: "test2" },
        { img: "test3" } 
    ]),
    comments: new observableArray([])
});


function onTakePictureTap(args){
	dialogs.confirm({
	  title: "Take picture",
	  message: "Take picture using device's camera?",
	  okButtonText: "OK",
	  cancelButtonText: "Cancel",
	}).then(function (result) {
	  console.log("Dialog result: " + result);
	  
		  if (result) {
				cameraModule.takePicture({width: 200, height: 200, keepAspectRatio: true})
				.then(function(picture) {
			    var imageModule = new imageModule.Image();
			    imageModule.imageSource = picture;
			    console.log("Result is an image source instance");

			    pageData.pictureList.push(imageModule);
				console.log(pageData.pictureList);

			    imageBoxXml.imageSource = picture;
			    console.log('picture shown');
			});

		}
	});	
}
exports.onTakePictureTap = onTakePictureTap;

function saveComment(args){
	dialogs.confirm({
	  title: "Comment",
	  message: "Add comment?",
	  okButtonText: "OK",
	  cancelButtonText: "Cancel",
	}).then(function (result) {
	  console.log("Dialog result: " + result);
	  
	  if (result) {
			var commentWriteField = view.getViewById(page, "commentWriteField");
			var comment = commentWriteField.text;

			if (comment.length > 0) {
			    pageData.comments.push({string: comment});
			    commentWriteField.text="";
			    
			   //  var toast = toastModule.makeText("Comment added.");
  				// toast.show();
			} else {
				dialogs.alert("Zero length comments not allowed!").then(function (result) {
					// var toast = toastModule.makeText("Comment scrapped.");
  			// 		toast.show();
				});
			}
	    }
	});	
}
exports.saveComment = saveComment;