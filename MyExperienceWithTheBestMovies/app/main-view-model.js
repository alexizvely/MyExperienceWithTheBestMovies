var frameModule = require("ui/frame");
var observable = require("data/observable").Observable;
var mainViewModel = new observable({
  filter_string: '',
  current_page: 1,
  last_page: 1,
  onLvItemTap: onLvItemTap,
  pageTransitionData: pageTransitionData,
  onButtonItemTapTransition: onButtonItemTapTransition,
  getMovieDataById: getMovieDataById,
  pageTransitionData: pageTransitionData,
  moviesList: []
});

mainViewModel.addEventListener(observable.propertyChangeEvent, function (args) {
  console.log('main-page -> addEventListener');
  if(args.propertyName == 'filter_string'){
      updateList();
    }
  if(args.propertyName == 'current_page'){
        displayPage();
      }
});

function displayPage(){
  console.log('main page -> displayPage');
  mainViewModel.moviesList=[];
  var page = +mainViewModel.current_page;
  if(isNaN(page) || page<1){
    page = +mainViewModel.last_page;
  }
  for(var i=(page-1)*4, len=(page-1)*4 + 4; i<len; i+=1){
    if(i<global.movies.length){
      var movieItem = global.movies[i];
      movieItem.watchedText = 'Not Watched'
      for (var y = 0; y < global.userExperiencesData.length; y++) {
        if(global.userExperiencesData[y].IdIMDB === movieItem.IdIMDB){
          movieItem.watchedText ='Watched'
        }
      }
      mainViewModel.moviesList.push(movieItem);
    }
  }
  mainViewModel.last_page = page;
};

function getMovieDataById(id){
  console.log('main page -> getMovieDataById');
  for(var i=0, len=global.movies.length; i<len; i+=1){
    if(global.movies[i].IdIMDB === id){
      return global.movies[i];
    }
  }
};

function updateList(){
  console.log('main-page -> updateList');
  mainViewModel.moviesList=[];
  for(var i in global.movies){
     if(global.movies[i].Title.indexOf(mainViewModel.filter_string) > -1){
       var movieItem = global.movies[i];
       movieItem.watchedText = 'Not Watched'
       for (var y = 0; y < global.userExperiencesData.length; y++) {
         if(global.userExperiencesData[y].IdIMDB === movieItem.IdIMDB){
           movieItem.watchedText ='Watched'
         }
       }
       mainViewModel.moviesList.push(movieItem);

     }
  }
};

function onLvItemTap(args) {
  console.log('main-page -> onLvItemTap');
  var pageString = "details-page";
  pageTransitionData(args, pageString);
};

function onButtonItemTapTransition(args) {
  console.log('main-page -> onButtonItemTapTransition');
  var pageString = "my-experience-page";
  pageTransitionData(args, pageString);
};

function pageTransitionData(args, pageString){
  console.log('main-page -> pageTransitionData');
  var pageName = "./" + pageString;
  var gridLayout = args.object;
  var id = gridLayout.id;
  var movie = getMovieDataById(id);
  console.log('main page-> pageTransitionData: object clicked: ' + id);
  var navigationEntry = {
          moduleName: pageString,
          context: {
            selectedMovie: movie
          },
          animated: true,
          navigationTransition: {
              transition: "flip ",
          }
      };
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
};

displayPage();
updateList();

exports.mainViewModel = mainViewModel;
