var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
	title:String,
	category:String,
	purpose:String,
	location:String,
	date:Date,
	image:String,
	eventSchedule:{ type : Array , "default" : [] },
	isActive:Boolean,
	created_at:{type: Date,default: Date.now}
});

// declare a model called User which has userProfileSchema
mongoose.model("Event",eventSchema);