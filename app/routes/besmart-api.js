var express = require('express');
var router = express.Router();

module.exports = function(eventsService,registrationService,contactService,twitterService){

	router
		.route("/events")
			.post(function(req,res){
				
				if(!req.isAuthenticated()){
					return res.send({isAuthenticated:false});
				}
	
				eventsService.createEvent(req,null,function(err){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success"});
				});
			});

	router
		.route("/events")
			.get(function(req,res){
				
				eventsService.getActiveEvents(req,null,function(err,events){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success",events:events});
				});
			});

	router
		.route("/events/popular")
			.get(function(req,res){
				
				eventsService.getPopularEvents(req,null,function(err,events){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success",events:events});
				});
			});

	router
		.route("/events/categories/count")
			.get(function(req,res){
				
				eventsService.getEventCountByCategory(req,null,function(err,result){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success",result:result});
				});
			});


	router
		.route("/events/:eventId")
			.get(function(req,res){
				
				eventsService.getEventDetailsById(req,null,function(err,event){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success",event:event});
				});
			});

	router
		.route("/registrations")
			.post(function(req,res){
				
				registrationService.register(req,null,function(err){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success"});
				});
			});

	router
		.route("/contacts")
			.post(function(req,res){
				
				contactService.saveContact(req,null,function(err){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success"});
				});
			});

	router
		.route("/tweets")
			.get(function(req,res){
				
				twitterService.getFavoriteTweets(req,null,function(err,event){

					if(err){
		                res.send({status:"failed",error:err});
		            }

		            res.send({status:"success",event:event});
				});
			});

	return router;
};