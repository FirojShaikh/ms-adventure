var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var UserProfile=mongoose.model('UserProfile');

module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(userProfile, done) {

        // tell passport which id to use for user
        console.log('serializing user:',userProfile._id);
        return done(null, userProfile._id);
    });

    passport.deserializeUser(function(id, done) {

        // return user object back
        UserProfile.findById(id,function(err,userProfile){
            if(err){
                return done(err,false);
            }

            return done(null,userProfile);
        });
    });

    passport.use('signin', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            console.log('sign in with this username: ' + username);

            UserProfile.findOne({username:username},function(err,userProfile){

                if(err){
                    return done(err,false);
                }

                if(!userProfile){
                    return done("user profile does not exists", false);
                }

                if(!isValidPassword(userProfile,password)){
                    return done('invalid password',false);
                }

                return done(null,userProfile);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            console.log('logged up with this username: ' + username);

            UserProfile.findOne({username:username},function(err,userProfile){

                if(err){
                    return done(err,false);
                }

                if(userProfile){
                    return done('username is already taken',false);
                }

                var newUserProfile= new UserProfile();

                newUserProfile.username=username;
                newUserProfile.password=createHash(password);
                newUserProfile.firstname=req.body.firstname;
                newUserProfile.lastname=req.body.lastname;
                
                newUserProfile.save(function(err){

                    if(err){
                        return done(err,false);
                    }

                    console.log('successfully signed up user');

                    return done(null,newUserProfile);
                });
            });
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};