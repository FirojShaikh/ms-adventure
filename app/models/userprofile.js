var mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({
	username:String,
	password:String,
	firstname:String,
	lastname:String,
	created_at:{type: Date,default: Date.now}
});

// declare a model called User which has userProfileSchema
mongoose.model("UserProfile",userProfileSchema);