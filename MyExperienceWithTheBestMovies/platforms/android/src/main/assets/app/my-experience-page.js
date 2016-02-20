var vmModule = require("./main-view-model");
var observable = require("data/observable").Observable;
var cameraModule = require("camera");
var imageModule = require("ui/image");
var view = require("ui/core/view");

var page;
var imageBoxXml = view.getViewById(page, "image");;

function pageLoaded(args) {
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}
exports.pageLoaded = pageLoaded;


function onTakePictureTap(args){
	cameraModule.takePicture({width: 200, height: 200, keepAspectRatio: true})
	.then(function(picture) {
	    // console.log("Result is an image source instance");
	    // var imageModule = new imageModule.Image();
	    // imageModule.imageSource = picture;
	    imageBoxXml.imageSource = picture;
	    console.log('picture taken');
	});
	
}
exports.onTakePictureTap = onTakePictureTap;

function saveComment(args){
	var commentWriteField = view.getViewById(page, "commentWriteField");
	var comment = commentWriteField.text;
	var showCommentField = view.getViewById(page, "showCommentField");
	showCommentField.text = comment;
	
}
exports.saveComment = saveComment;
