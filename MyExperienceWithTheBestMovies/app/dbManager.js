(function () {
	var sqlite = require('nativescript-sqlite');

	var DBManager = (function () {

		var dbname = "movies.db";
		var db = null;

		function DBManager() {

			if (!sqlite.exists(dbname)) {
		        sqlite.copyDatabase(dbname);
		  	}

		  new sqlite(dbname, function(err, dbConnection) {
			if (err) {
		    console.log(err);
			}

		  db = dbConnection;
	    db.resultType(sqlite.RESULTSASOBJECT);
	    db.valueType(sqlite.VALUESARENATIVE);
		  });
		}

		DBManager.prototype.insertMovie = function(title, year, director, runtime, urlPoster, genre, plot, idIMDB, rating, rated, ranking) {
			 db.execSQL('insert into Movie (Title, Year, Director, Runtime, UrlPoster, Genre, Plot, IdIMDB, Rating, Rated, Ranking) values ("' +
			  title +
			  '", "' +
			  year +
			  '", "' +
        director +
        '", "' +
        runtime +
        '", "' +
        urlPoster +
        '", "' +
        genre +
        '", "' +
        plot +
        '", "' +
        idIMDB +
        '", "' +
        rating +
        '", "' +
        rated +
        '", "' +
			  ranking +
			  '")');
		};

		DBManager.prototype.getAllMovies = function(callback) {
			db.all('select Title, Year, Director, Runtime, UrlPoster, Genre, Plot, IdIMDB, Rating, Rated, Ranking from Movie', function (err, loadedData) {
				var result = [];
		        if (err) {
		            console.log('dbManager -> getAllMovies: error: ' + err);
		        }
		        callback(loadedData);
	    	});
		};

		function encodeData(data) {
			return data.replace(/'/g, "&#39;").replace(/"/g,"&quot;");
		}

		function decodeData(data) {
			return data.replace(/&#39;/g, '\'').replace(/&quot;/g,"\"");
		}

		return DBManager;
	})();

	exports.DBManager = DBManager;
}());
