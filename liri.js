var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var input = process.argv[2];
var searchTerm = process.argv[3];

function myTweets(){
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: 'joshcarroll42'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  		if (!error) {
    		for (prop in tweets){
    			console.log(tweets[prop]['text']);
    			console.log(tweets[prop]['created_at'] + "\n");
    		}
  		}
	});
}

function spotifyThisSong(){
	if (typeof searchTerm === 'undefined'){
		searchTerm = "What's My Age Again";
	}
	spotify.search({type: 'track', query: searchTerm}, function(err, data){
		if (err){
			console.log("Hit an error. Try again: " + err);
		}
		else{
			var counter = 1;
			var tracks = data.tracks.items;

			for (prop in tracks){
				var allArtists = tracks[prop].artists[0].name;
					for (i = 1; i < tracks[prop].artists.length; i++){
						allArtists = allArtists + "," + tracks[prop].artists[i].name;
					}
				console.log(counter);
				console.log("artist(s): " + allArtists);
				console.log("song name: " + tracks[prop].name);
				console.log("preview song: " + tracks[prop].preview_url);
				console.log("album: " + tracks[prop].album.name);
				console.log("------------------------------------------");
				counter++;
			}
		}
	});
}

function movieThis(){
	if (typeof searchTerm === 'undefined'){
		searchTerm = "Mr. Nobody";
	}
	request('http://omdbapi.com/?t=' + searchTerm + "&y=&plot=full&tomatoes=true&r=json", function(error, response, body){
		if (!error && response.statusCode == 200){
			body = JSON.parse(body);
			console.log("Title: " + body.Title);
			console.log("Year: " + body.Year);
			console.log("Rated: " + body.Rated);
			console.log("IMDb Rating: " + body.imdbRating);
			console.log("Country: " + body.Country);
			console.log("Language: " + body.Language);
			console.log("Plot: " + body.Plot);
			console.log("Actors: " + body.Actors);
			console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
			console.log("Rotten Tomatoes URL: " + body.tomatoURL);
		}
	});
}

function doWhatItSays(){
	fs.readFile('random.txt', 'utf8', function(err, data){
		var inputArr = data.split(',');
		input = inputArr[0];
		searchTerm = inputArr[1];
		run();
	});
}

function run(){
	switch (input){
		case 'my-tweets':
			myTweets();
			break;
		case 'spotify-this-song':
			spotifyThisSong();
			break;
		case 'movie-this':
			movieThis();
			break;
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
			console.log("Not a valid input, broh. Try again");
	}
}

run();