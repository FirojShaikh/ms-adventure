var twitter = require('twitter');

function TwitterFeedService(){

}

TwitterFeedService.prototype.getFavoriteTweets=function(req,res,done){

	/* Here Twitter API secret key and access token needs to be specified */
	var client = new twitter({
	  consumer_key: '',
	  consumer_secret: '',
	  access_token_key: '',
	  access_token_secret: ''
	});

	var params = {count: 1};
	client.get('statuses/user_timeline',params, function(error, tweets, response){
	  /*if(error) throw error;
	  console.log(tweets);  // The favorites. 
	  console.log(response);  // Raw response object. */

		if(error){
			done(error);
		}

		return done(null,tweets);
	});
};

module.exports = new TwitterFeedService();