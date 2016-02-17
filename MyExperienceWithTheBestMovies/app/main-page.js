var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var viewModule = require("ui/core/view");
var frameModule = require("ui/frame");
var topmost;
var page;

var pageData = new Observable({
    moviesList: new ObservableArray([
        { name: "Shawshank redemption",
          year: "1994",
          director: "Spielberg" },
        { name: "Snatch",
          year: "1998",
          director: "Spielberg" },
        { name: "Waterworld",
          year: "1998",
          director: "Spielberg" }
    ])
});

exports.pageLoaded = function(args) {
	topmost = frameModule.topmost();
    page = args.object;
    page.bindingContext = pageData;
};

exports.onItemTap = function(args) {
    var index = (args.index);
    var navigationEntry = {
    moduleName: "details-page",
    context: {
    	title: pageData.moviesList[index].name,
    	year: pageData.moviesList[index].year
    },
    animated: false
	};

	topmost.navigate(navigationEntry);
};









// var vmModule = require("./main-view-model");
// var http = require("http");
// var fs = require("file-system");
// var observableArray = require("data/observable-array");
// var observableModule = require("data/observable");

// var movieList = new observableArray.ObservableArray([]);
// var pageData = new observableModule.Observable();

// function pageLoaded(args) {
//     var page = args.object;
//     pageData.set("movieList", movieList);
//         // it links an xml "list" variable to a js list variable
//     page.bindingContext = pageData;
// }
// exports.pageLoaded = pageLoaded;

// exports.movies = function() {
// 	var documents = fs.knownFolders.documents();
// 	var myFile = documents.getFile("movies.json");
// 	console.log(JSON.stringify(myFile));
// 	myFile.readText()
//         .then(function (content) {
//         console.log(JSON.stringify(content));
//         console.log('success');
//     }, function (error) {
//         console.log('error');
//     });
// };








    // http.getJSON("~/raw/movies").then(function(r) {
		//http://www.myapifilms.com/imdb/top?start=1&end=250&token=5d240423-4156-4db2-9a53-ec242d2425da&format=json&data=1
		// for (var i = 0; i < 10 ; i++){
		// 	movieList.push(r.data.movies[i]);
		// 	console.log(movieList[i].title);
		// }

		// var result = r.data;
		// var movies = result.movies
		// var movie;
		 // console.log(movies[0].title);
   //       console.log(movies[0].year);
	   // for (var i = 0; i < movies.length ; i++) {
		  //  	movie = {
		  //  		name: movies[i].title,
		  //  		year: movies[i].year,
		  //  		imdb: movies[i].imdb,
		  //  		img: movies[i].img
		  //  	}
		  //  	movieList.push(movie); 		
	   // }
	   // console.log(movieList.length);


	   // for (var i = 0; i < movieList.length ; i++) {
	   // 	console.log(movieList[i].name);	
	   // }


    // }, function(e) {

    //     console.log(e);

    // });
  


// var vmModule = require("./main-view-model");
// function pageLoaded(args) {
//     var page = args.object;
//     page.bindingContext = vmModule.mainViewModel;
// }
// exports.pageLoaded = pageLoaded;