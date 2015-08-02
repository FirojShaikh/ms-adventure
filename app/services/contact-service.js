var mongoose = require('mongoose');
var Contact=mongoose.model('Contact');

function ContactService(){

}

ContactService.prototype.saveContact=function(req,res,done){

	var newContactToSave=new Contact();

	newContactToSave.name=req.body.name;
	newContactToSave.email=req.body.email;
	newContactToSave.subject=req.body.subject;
	newContactToSave.message=req.body.message;
	newContactToSave.status='new';

	newContactToSave.save(function(err){
		return done(err);
	});
};

module.exports = new ContactService();