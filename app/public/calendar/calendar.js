(function(){
	'use strict';

	angular
		.module('besmartapp.calendar')
		.controller('CalendarController',['$scope','$http',
				function($scope,$http){

					$scope.calendarConfig={
						height:750,
						header:{
							left: 'month agendaWeek agendaDay',
							center: 'title',
							right:'today prev next'
						},
						defaultView:'month',
						firstHour:8
					};

					$scope.init=function(){

						/*var date = new Date();
					    var d = date.getDate();
					    var m = date.getMonth();
					    var y = date.getFullYear();

				    	$scope.events = [
					      {title: 'All Day Event',start: new Date(y, m, 1)},
					      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
					      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
					      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
					      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
					      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
					    ];*/

					    var calendarEvents=[];

					    $http
							.get('/besmartapi/events')
							.success(function(data,status,headers,config){
								if(data.status=="success"){

									var nonProgramEvent={
										events:[]
									};

									var programEvent={
										color:'#EE3233',
										textColor:'white',
										events:[]
									};

									for (var index in data.events) {
										for(var scheduleIndex in data.events[index].eventSchedule){
											if(data.events[index].category=="Program"){
												programEvent.events.push({
													id:data.events[index]._id,
													type:'Program',
													start:new Date(data.events[index].eventSchedule[scheduleIndex].dateTime),
													title:data.events[index].title,
													allDay:false,
													durationEditable:false,
													end:moment(new Date(data.events[index].eventSchedule[scheduleIndex].dateTime)).add(data.events[index].eventSchedule[scheduleIndex].duration,'hour').toDate(),
													url:"#/event-detail?eventId=" + data.events[index]._id,
													stick:true
												});	
											}
											else{
												nonProgramEvent.events.push({
													id:data.events[index]._id,
													type:'NonProgramEvent',
													start:new Date(data.events[index].eventSchedule[scheduleIndex].dateTime),
													title:data.events[index].title,
													allDay:false,
													durationEditable:false,
													end:moment(new Date(data.events[index].eventSchedule[scheduleIndex].dateTime)).add(data.events[index].eventSchedule[scheduleIndex].duration,'hour').toDate(),
													url:"#/event-detail?eventId=" + data.events[index]._id,
													stick:true
												});	
											}
										}
									}
									
									$scope.eventSources.push(nonProgramEvent);
									$scope.eventSources.push(programEvent);

									console.log('events GET successfully');	
								}
								else{
									console.log('events GET failed', data);	
								}
								
							})
							.error(function(data,status,headers,config){
								console.log('event GET failed', data);
							});

							$scope.eventSources = [calendarEvents];
					};

					$scope.init();
	}]);

})();