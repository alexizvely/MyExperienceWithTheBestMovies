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
var currentExperience;
var imageBoxXml;
var images=[];
var timer = require("timer");
var Everlive = require('./everlive.all.min');

var page;
var vm = vmModule.viewModel;

function onNavigatedTo(args) {
  console.log('my-experience-page-> onNavigatedTo');
  page = args.object;
  var data = vmModule.viewModel;
  data.selectedMovie = args.object.navigationContext.selectedMovie;
  page.bindingContext = vmModule.viewModel;
  currentExperience = getExpirienceDataById(args.object.navigationContext.selectedMovie.IdIMDB);
  timer.setTimeout(function(){
    console.log("Timer Called");
      fillViewModel();
      imageBoxXml = view.getViewById(page, "image");
    //    imageBoxXml.src ="~/images/imagePlaceholder.png";
        var images = currentExperience.Images;

        console.log(images[0]);

    global.everlive.files.getDownloadUrlById(images[0])
    .then(function(downloadUrl){
      imageBoxXml.src = downloadUrl;
      console.log(downloadUrl);
        //document.getElementById('anchor1').href = downloadUrl;
    },
    function(error){
        alert(JSON.stringify(error));
    });

        imageBoxXml.imageSource = images[0];

        console.log("imagesEV----> " + images.length);
  },2000)

  console.log('my-experience-page-> onNavigatedTo: Selected movie: ' + args.object.navigationContext.selectedMovie.Title);

     //on load animation
    animateChangeColorButtonWithId("pictureButton", "#fad417", 1500);
    animateChangeColorButtonWithId("noteButton", "#fad417", 1500);
    animateChangeColorButtonWithId("noteButton", "#fad417", 1500);

     //loading sound for btn click
    soundEffect = sound.create("~/sounds/clickedSound.mp3");
    badInputEffect = sound.create("~/sounds/negativeSound.mp3");
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
          images.push(picture);

/// create image file and add it to the TBS:
          var file = {
              "Filename": "everlive.jpg",
              "ContentType": "image/jpg",
              "CustomField": "Images",
              "base64": picture.toBase64String()
          };
          var imageEL;
          global.everlive.files.create(file,
              function (data) {
                  imageEL = data['result'];
                  var attributes = {
                      "$push": {
                          "Images": imageEL.Id
                      }
                  };
                  var item = {
                      'Id': currentExperience.Id,
                  };
                  var dataToUpload = global.everlive.data('Experience');
                  dataToUpload.rawUpdate(attributes, item,
                      function(dataT){
                      },
                      function(error){
                          alert(JSON.stringify(error));
                      });
              },
              function (error) {
                  alert(JSON.stringify(error));
              });
			    console.log('my-experience-page -> onTakePictureTap: picture shown');
			});
		}
	});
}
exports.onTakePictureTap = onTakePictureTap;

function getExpirienceDataById(id){
  console.log('main page -> getMovieDataById');
  for(var i=0, len=global.userExperiencesData.length; i<len; i+=1){
    if(global.userExperiencesData[i].IdIMDB === id){
      return global.userExperiencesData[i];
    }
  }
  global.everlive.data('Experience')
  .create({ 'DeviceId' : global.deviceID, 'IdIMDB' : id, 'Rating' : 5, 'Notes' : [], 'Images' : []}, function(data){
    var userExperiences = global.everlive.data('Experience');
    var query = new Everlive.Query();
    query.where().equal('DeviceId', global.deviceID).equal('IdIMDB', id);
    userExperiences.get(query)
        .then(function(data){
              currentExperience = data['result'][0];
              global.userExperiencesData.push(currentExperience);
        },
        function(error){
            console.log('app start: elExperiences.get: error: ' + error.message);
        });

    console.log('app start: elUsers.get: UserRegistered');
   },
    function(error){
    console.log('app start: error: ' + JSON.stringify(error));
  });
}

function fillViewModel(){
  vm.sliderValue = currentExperience.Rating;
  vmModule.viewModel.notes=[];
  vmModule.viewModel.pictureList=[];
  for (var i = 0; i < currentExperience.Notes.length; i++) {
    vmModule.viewModel.notes.push(currentExperience.Notes[i]);
  }
  for (var i = 0; i < currentExperience.Images.length; i++) {
    global.everlive.files.getDownloadUrlById(currentExperience.Images[i])
    .then(function(downloadUrl){
      vmModule.viewModel.pictureList.push(downloadUrl);
    },
    function(error){
        alert(JSON.stringify(error));
    });
  }
  var list = view.getViewById(page, "imageList");


  console.log('timerStart');
  timer.setTimeout(function(){
    console.log("Timer Called");
    list.refresh();
  },2000)
}

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

/// adding to the TBS:
        var attributes = {
            "$push": {
                "Notes": note
            }
        };
        var item = {
            'Id': currentExperience.Id,
        };
        var dataToUpload = global.everlive.data('Experience');
        dataToUpload.rawUpdate(attributes, item,
            function(dataT){
            },
            function(error){
                alert(JSON.stringify(error));
        });
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


// gestures - longPress  to delete
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

function onSaveSlider(){
  var dataToUpload = global.everlive.data('Experience');
  dataToUpload.updateSingle({ Id: currentExperience.Id, 'Rating': vmModule.viewModel.sliderValue },
  function(data){
  },
  function(error){
      alert(JSON.stringify(error));
  });
}

exports.onSaveSlider = onSaveSlider;
exports.onNavigatedTo = onNavigatedTo;
