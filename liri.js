var keys = require('./keys');
var Twitter = require('twitter');
var spotify = require('spotify');
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
	spotify.search({type: 'track', query: searchTerm}, function(err, data){
		if (err){
			console.log("Hit an error. Try again: " + err);
		}
		else{
			var counter = 1;
			var tracks = data.tracks.items;

			//console.log(tracks)
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