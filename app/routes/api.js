var express = require("express");
var router = express.Router();

var mongoose = require('mongoose');
var UserProfile=mongoose.model('UserProfile');

//var eventService=require('/services/event-service.js');

// This is how API authentication can be handled
router.use("/users",function(req,res,next){

	// POST operation on /POST should be authenticated
	if(!req.isAuthenticated()){
		return res.send({isAuthenticated:false});
	}

	return next();
});

// This is how API authentication can be handled
router.use("/posts",function(req,res,next){
	
	// GET method on /posts need not be authenticated
	if(req.method==="GET"){
		return next();
	}

	// POST operation on /POST should be authenticated
	if(!req.isAuthenticated()){
		return res.redirect("/#signup");
	}

	return next();
});

router.route("/posts")
	// return all posts
	.get(function(req,res){
		
		//temporary solution

		res.send({message:"TODO: return all posts firoj"});
	})

	.post(function(req,res){

		//temporary solution

		res.send({message:"TODO: create new post."});
	});

router.route("/posts/:id")
	//get specific post
	.get(function(req,res){
		//temporary solution
		res.send({message:"TODO: return post with id " + req.params.id});
	})

	// put specific post to modify it
	.put(function(req,res){

		res.send({message:"TODO: modify post with id " + req.params.id});
	})

	// delete post
	.delete(function(req,res){

		res.send({message:"TODO: delete post with id " + req.params.id});
	});

router.route("/users/:username")
	//get specific user by username
	.get(function(req,res){
		// return user object back
        UserProfile.find({username:req.params.username},function(err,userProfile){
            if(err){
                res.send(err);
            }

            if(!userProfile){
            	res.send('user not found2');
            }

            res.send(userProfile);
        });
	});

module.exports=router;

