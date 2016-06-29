var keys = require('./keys');
var Twitter = require('twitter');
var input = process.argv[2];


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