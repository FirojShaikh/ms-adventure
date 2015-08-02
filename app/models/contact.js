var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	name:String,
	email:String,
	subject:String,
	message:String,
	status:String,
	created_at:{type: Date,default: Date.now}
});

// declare a model called User which has userProfileSchema
mongoose.model("Contact",contactSchema);