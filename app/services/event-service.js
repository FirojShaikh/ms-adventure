var mongoose = require('mongoose');
var Event=mongoose.model('Event');

function EventService(){

}

EventService.prototype.createEvent=function(req,res,done){

	var newEventToCreate=new Event();

	newEventToCreate.title=req.body.title;
	newEventToCreate.category=req.body.category;
	newEventToCreate.purpose=req.body.purpose;
	newEventToCreate.location=req.body.location;
	newEventToCreate.date=req.body.date;
	newEventToCreate.image=req.body.image;
	newEventToCreate.isActive=req.body.isActive;

	for(var scheduleIndex in req.body.eventSchedule) {
		newEventToCreate.eventSchedule.push(req.body.eventSchedule[scheduleIndex]);
	}

	newEventToCreate.save(function(err){
		console.log(err);
		return done(err);
	});
};

EventService.prototype.getActiveEvents=function(req,res,done){
	Event.find({isActive:true},function(err,events){
		if(err){
			done(err);
		}

		return done(null,events);
	});
};

EventService.prototype.getPopularEvents=function(req,res,done){
	Event.find().sort({'created_at':'descending'}).limit(3).find(function(err,events){
		if(err){
			done(err);
		}

		return done(null,events);
	});
};

EventService.prototype.getEventCountByCategory=function(req,res,done){
	Event.aggregate([
        {
            $group: {
                _id: '$category',  //$category is the column name in collection
                // name:'$category',
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            done(err);
        } else {
            done(null,result);
        }
    });
};

EventService.prototype.getEventDetailsById=function(req,res,done){
	Event.findById(req.params.eventId,function(err,events){
		if(err){
			done(err);
		}

		return done(null,events);
	});
};

module.exports = new EventService();