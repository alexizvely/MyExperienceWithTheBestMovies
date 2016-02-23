var vmModule = require('./main-view-model');
var tnsfx = require('nativescript-effects'); //plugin for animation
var sound = require('nativescript-sound'); // for button click sound
var view = require("ui/core/view");
var timer = require("timer");
var soundEffect;// for button click sound
var page;

function pageLoaded(args) {
    console.log('main-page-> pageLoaded');
    page = args.object;
    page.bindingContext = vmModule.mainViewModel;

// fade in on start animation
    var screen = page.getViewById('mainScreen');
    screen.opacity = 0;
    screen.fadeIn(1200);

// loading sound for button click
    soundEffect = sound.create('~/sounds/clickedSound.mp3');

    console.log('timerStart');
    timer.setTimeout(function(){
      console.log("Timer Called");
      vmModule.mainViewModel.filter_string = "";
    },2000)

}

function onButtonItemTap(args){
  console.log('main-page -> onButtonItemTap');
  soundEffect.play();
  vmModule.mainViewModel.onButtonItemTapTransition(args);
};



exports.pageLoaded = pageLoaded;
exports.onButtonItemTap = onButtonItemTap;
exports.onLvItemTap = vmModule.mainViewModel.onLvItemTap;
