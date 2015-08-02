var express = require("express");
var router = express.Router();

var mongoose = require('mongoose');
var UserProfile=mongoose.model('UserProfile');

// This is how API authentication can be handled
router.use("/users",function(req,res,next){

	// POST operation on /POST should be authenticated
	if(!req.isAuthenticated()){
		return res.redirect("/");
	}

	return next();
});

router.route("/users/:username")
	//get specific user by username
	.get(function(req,res){
		// return user object back
        UserProfile.find({username:username},function(err,userProfile){
            if(err){
                return done(err,false);
            }

            if(!userProfile){
                return done('user not found3',false);
            }

            return done(null,userProfile);
        });
	});

module.exports=router;