var vmModule = require("./main-view-model");
var tnsfx = require('nativescript-effects'); //plugin for animation
var sound = require("nativescript-sound"); // for button click sound
var soundEffect;// for button click sound
var users = global.everlive.data('AppUser');
var page;

function pageLoaded(args) {
    console.log('main-page-> pageLoaded');
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var activities = global.everlive.data('Movie');

    activities.get(null, function(data) {
        console.log('Telerik Backend Services works! Here is the first movie uploaded there: ' + JSON.stringify(data));
    }, function(err) {
        console.log(err.message);
    })

// fade in on start animation
    var screen = page.getViewById("mainScreen");
    screen.opacity = 0;
    screen.fadeIn(1200);

// loading sound for button click
    soundEffect = sound.create("~/sounds/clickedSound.mp3");

// loging and registration
    users.get(null, function(data){
      var elUsers = data.result;
      var userIndex = -1;
      console.log("main-page> users -> " + elUsers.length);
      for (var i = 0; i < elUsers.length; i++) {
        console.log("-------> " + i);
        if(global.deviceID === elUsers[i]['DeviceId']){
          console.log("main-page> users -> " + elUsers[i]['DeviceId']);
          userIndex = i;
        }
      }

      if(userIndex < 0){
        global.everlive.data('AppUser')
        .create({ 'DeviceId' : global.deviceID, 'UserName': name, 'Health': 100}, function(data){
          console.log("UserRegistered");
        },
        function(error){
          console.log(JSON.stringify(error));
        });
      } else {
        global.currentUser = elUsers[userIndex];
        console.log("User logged");
      }
    }, function(err){
      console.log(err.message);
    })
};

function onButtonItemTap(args){
  console.log('main-page -> onButtonItemTap');
  soundEffect.play();
  vmModule.mainViewModel.onButtonItemTapTransition(args);
};

exports.pageLoaded = pageLoaded;
exports.onButtonItemTap = onButtonItemTap;
exports.onLvItemTap = vmModule.mainViewModel.onLvItemTap;
