var path = require('path'), 
	config = require( path.join(__dirname, '../config/app.js' ) ), 
	twitter = require('ntwitter');

// initialisation
var twit = new twitter({
	consumer_key: config.twitter.key,
	consumer_secret: config.twitter.secret,
	access_token_key: config.twitter.token_key,
	access_token_secret: config.twitter.token_secret
});


function init( data ){ 

	twit.stream('statuses/filter', { track: config.data.track, locations: config.data.locations }, function(stream) {
	  stream.on('data', function ( stream ) {
		
			data.update( stream );
		  
	  });
	  stream.on('end', function (response) {
		// Handle a disconnection
	  });
	  stream.on('destroy', function (response) {
		// Handle a 'silent' disconnection from Twitter, no end/error event fired
	  });
	});

}


exports.init = init;