var frameModule = require("ui/frame");
var observable = require("data/observable").Observable;
var moviesList = [
        { title: "The Shawshank Redemption",
          year: "1994",
          director: "Frank Darabont",
          runtime: "142",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/redemption.jpg",
          genre: "Drama",
          plot: "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he claims he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
          imdbRating: "9.3",
          idIMDB: "1"
        },
        { title: "The Godfather",
          year: "1972",
          director: "Francis Ford Coppola",
          runtime: "175",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMjEyMjcyNDI4MF5BMl5BanBnXkFtZTcwMDA5Mzg3OA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/godfather.jpg",
          genre: "Crime",
          plot: "When the aging head of a famous crime family decides to transfer his position to one of his subalterns, a series of unfortunate events start happening to the family, and a war begins between all the well-known families leading to insolence, deportation, murder and revenge, and ends with the favorable successor being finally chosen.",
          imdbRating: "9.2",
          idIMDB: "2"
        },
        { title: "The Dark Knight",
          year: "2008",
          director: "Christopher Nolan",
          runtime: "152",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/darkKnight.jpg",
          genre: "Action",
          plot: "Batman raises the stakes in his war on crime. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the city streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as The Joker.",
          imdbRating: "9.0",
          idIMDB: "3"
        },
        { title: "Pulp Fiction",
          year: "1994",
          director: "Quentin Tarantino",
          runtime: "154",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/pulpFiction.jpg",
          genre: "Crime",
          plot: "Jules Winnfield and Vincent Vega are two hitmen who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace. Wallace has also asked Vincent to take his wife Mia out a few days later when Wallace himself will be out of town. Butch Coolidge is an aging boxer who is paid by Wallace to lose his next fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.",
          imdbRating: "8.9",
          idIMDB: "4"
        },
        { title: "Schindler's List",
          year: "1993",
          director: "Steven Spielberg",
          runtime: "195",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMzMwMTM4MDU2N15BMl5BanBnXkFtZTgwMzQ0MjMxMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/shindlersList.jpg",
          genre: "Drama",
          plot: "Oskar Schindler is a vainglorious and greedy German businessman who becomes an unlikely humanitarian amid the barbaric Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament for the good in all of us.",
          imdbRating: "8.9",
          idIMDB: "5"
        },
        { title: "12 Angry Men",
          year: "1957",
          director: "Sidney Lumet",
          runtime: "96",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BODQwOTc5MDM2N15BMl5BanBnXkFtZTcwODQxNTEzNA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/12AngryMen.jpg",
          genre: "Drama",
          plot: "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father. What begins as an open-and-shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, and each other. Based on the play, all of the action takes place on the stage of the jury room.",
          imdbRating: "8.9",
          idIMDB: "6"
        },
        { title: "The Lord of the Rings: The Return of the King",
          year: "2003",
          director: "Peter Jackson",
          runtime: "201",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMjE4MjA1NTAyMV5BMl5BanBnXkFtZTcwNzM1NDQyMQ@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/returnOfTheKing.jpg",
          genre: "Adventure",
          plot: "While Frodo & Sam continue to approach Mount Doom to destroy the One Ring, unaware of the path Gollum is leading them, the former Fellowship aid Rohan & Gondor in a great battle in the Pelennor Fields, Minas Tirith and the Black Gates as Sauron wages his last war against Middle-earth.",
          imdbRating: "8.8",
          idIMDB: "7"
        },
        { title: "The Good, the Bad and the Ugly",
          year: "1966",
          director: "Sergio Leone",
          runtime: "161",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/goodBadUgly.jpg",
          genre: "Western",
          plot: "Blondie (The Good) is a professional gunslinger who is out trying to earn a few dollars. Angel Eyes (The Bad) is a hit man who always commits to a task and sees it through, as long as he is paid to do so. And Tuco (The Ugly) is a wanted outlaw trying to take care of his own hide. Tuco and Blondie share a partnership together making money off Tuco's bounty, but when Blondie unties the partnership, Tuco tries to hunt down Blondie. When Blondie and Tuco come across a horse carriage loaded with dead bodies, they soon learn from the only survivor (Bill Carson) that he and a few other men have buried a stash of gold in a cemetery. Unfortunately Carson dies and Tuco only finds out the name of the cemetery, while Blondie finds out the name on the grave. Now the two must keep each other alive in order to find the gold. Angel Eyes (who had been looking for Bill Carson) discovers that Tuco and Blondie meet with Carson and knows they know the location of the gold. All he needs is for the two to ...",
          imdbRating: "8.7",
          idIMDB: "8"
        },
        { title: "Fight Club",
          year: "1999",
          director: "Chuck Palahniuk",
          runtime: "139",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BMjIwNTYzMzE1M15BMl5BanBnXkFtZTcwOTE5Mzg3OA@@._V1_UX182_CR0,0,182,268_AL_.jpg",
          image: "~/images/fightClub.jpg",
          genre: "Drama",
          plot: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.","simplePlot":"An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...",
          imdbRating: "8.7",
          idIMDB: "9"
        },
        { title: "The Lord of the Rings: The Fellowship of the Ring",
          year: "2001",
          director: "Peter Jackson",
          runtime: "178",
          imgUrl: "http://ia.media-imdb.com/images/M/MV5BNTEyMjAwMDU1OV5BMl5BanBnXkFtZTcwNDQyNTkxMw@@._V1_UY268_CR0,0,182,268_AL_.jpg",
          image: "~/images/returnOfTheKing.jpg",
          genre: "Adventure",
          plot: "An ancient Ring thought lost for centuries has been found, and through a strange twist in fate has been given to a small Hobbit named Frodo. When Gandalf discovers the Ring is in fact the One Ring of the Dark Lord Sauron, Frodo must make an epic quest to the Cracks of Doom in order to destroy it! However he does not go alone. He is joined by Gandalf, Legolas the elf, Gimli the Dwarf, Aragorn, Boromir and his three Hobbit friends Merry, Pippin and Samwise. Through mountains, snow, darkness, forests, rivers and plains, facing evil and danger at every corner the Fellowship of the Ring must go. Their quest to destroy the One Ring is the only hope for the end of the Dark Lords reign!","simplePlot":"A meek Hobbit and eight companions set out on a journey to destroy the One Ring and the Dark Lord Sauron.",
          imdbRating: "8.7",
          idIMDB: "10"
        }
    ];

var mainViewModel = new observable({
  filter_string: '',
  onLvItemTap: onLvItemTap,
  moviesList: []
});

mainViewModel.addEventListener(observable.propertyChangeEvent, function (pcd) {
  console.log('changed');
  if(pcd.propertyName == 'filter_string'){
      updateList();
    }
});

function updateList(){
  console.log('updateList');
  mainViewModel.moviesList=[];
  for(var i in moviesList){
     if(moviesList[i].title.indexOf(mainViewModel.filter_string) > -1){
       mainViewModel.moviesList.push(moviesList[i]);
     }
  }
}

function onLvItemTap(args) {
  var gridLayout = args.object;
  var id = gridLayout.id;
  console.log('main page-> onLvItemTap, object clicked: ' + id);
  var navigationEntry = {
          moduleName: "./details-page",
          context: {
            selectedId: id
          },
          animated: true,
          navigationTransition: {
              transition: "flip ",
          }
      };

      var topmost = frameModule.topmost();
      topmost.navigate(navigationEntry);
};

updateList();
exports.onLvItemTap = onLvItemTap;
exports.mainViewModel = mainViewModel;
