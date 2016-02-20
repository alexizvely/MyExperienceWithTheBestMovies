var vmModule = require("./main-view-model");
var observable = require("data/observable").Observable;
var observableArray = require("data/observable-array").ObservableArray;
var cameraModule = require("camera");
var imageModule = require("ui/image");
var view = require("ui/core/view");

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
exports.onTakePictureTap = onTakePictureTap;

function saveComment(args){
	var commentWriteField = view.getViewById(page, "commentWriteField");
	var comment = commentWriteField.text;
	pageData.comments.push({string: comment});
	commentWriteField.text="";
	
}
exports.saveComment = saveComment;
