(function(){
	'use strict';

	angular
		.module('besmartapp.authentication')
		.controller('AuthenticationController',['$scope','$http','$rootScope','$location','$cookies',
				function($scope,$http,$rootScope,$location,$cookies){

					var ensureAuthentication=function(){
						var currentUserCookie = $cookies.get('currentUser');
						var time = new Date().getTime();
						var date = new Date(time);
						if(currentUserCookie){

							var req = {
							  method: 'GET',
							  url: '/api/users/'+currentUserCookie,
							  headers: {
							    'If-Modified-Since': date
							  }
							}

							$http(req)
								//.get('/api/users/'+currentUserCookie, { cache: false})
								.success(function(data,status,headers,config){
									if(data.isAuthenticated==false){
										console.log('Not Authenticated');
										$rootScope.isAuthenticated=false;
										$rootScope.displayName='';
										$cookies.remove('currentUser');
									}
									else{
										$rootScope.isAuthenticated=true;
										console.log('Authenticated ',data);
										console.log('Authenticated ',data[0].firstname);
										$rootScope.displayName=data[0].firstname+' '+data[0].lastname;
										$cookies.put('currentUser',data[0].username);
									}
								})
								.error(function(data,status,headers,config){
									console.log('Error ',data);
									$rootScope.isAuthenticated=false;
									$rootScope.displayName='';
									$cookies.remove('currentUser');
								});
						}
						else{
							$rootScope.isAuthenticated=false;
							$rootScope.displayName='';
						}
					}

					/* Converts an object into a key/value par with an optional prefix. Used for converting objects to a query string */
					var qs = function(obj, prefix){
					  var str = [];
					  for (var p in obj) {
					    var k = prefix ? prefix + "[" + p + "]" : p, 
					        v = obj[k];
					    str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURIComponent(v));
					  }
					  return str.join("&");
					}

					$scope.signUp=function(){
						console.log($scope.newuser);

						if($scope.newuser.password!==$scope.newuser.confirmpassword){
							$scope.isSignUpFailed=true;
							$scope.message="Password and confirmed password are not matching.";

							return;
						}

						var req = {
							 method: 'POST',
							 url: '/auth/signup',
							 headers: {
							 	'Accept':'*/*',
							   	'Content-Type': 'application/x-www-form-urlencoded'
							 },
							 data: qs($scope.newuser)
						}

						$http(req)
							.success(function(data,status,headers,config){
								console.log(data);
								console.log('Signed up successfully ',data.username);
								$cookies.put('currentUser',data.username);
								ensureAuthentication();
							})
							.error(function(data,status,headers,config){
								console.log('Signed up failed');
								$scope.isSignUpFailed=true;
								$scope.message=data;
								$rootScope.isAuthenticated=false;
								$rootScope.displayName='';
								$cookies.remove('currentUser');
							});
					};

					$scope.signIn=function(){
						
						var req = {
							 method: 'POST',
							 url: '/auth/signin',
							 headers: {
							 	'Accept':'*/*',
							   	'Content-Type': 'application/x-www-form-urlencoded'
							 },
							 data: qs($scope.user)
						}

						$http(req)
							.success(function(data,status,headers,config){
								console.log('Authenticated ',data.username);
								$scope.isSignInFailed=false;
								$scope.failedmessage=data;
								$cookies.put('currentUser',data.username);
								ensureAuthentication();
							})
							.error(function(data,status,headers,config){
								console.log('Not Authenticated');
								$scope.isSignInFailed=true;
								$scope.failedmessage=data;
								$rootScope.isAuthenticated=false;
								$rootScope.displayName='';
								$cookies.remove('currentUser');
							});
					};

					$scope.signOut=function(){
						
						var time = new Date().getTime();
						var date = new Date(time);

						var req = {
							  method: 'GET',
							  url: '/api/signOut',
							  headers: {
							    'If-Modified-Since': date
							  }
							}

						$http(req)
							//.get('/auth/signOut', { cache: false})
							.success(function(){
								console.log('Signed Out');
							})
							.error(function(data,status,headers,config){
								console.log('Sign out failed.',status,data);
							});
						
						$rootScope.isAuthenticated=false;
						$rootScope.displayName='';
						$cookies.remove('currentUser');	
					};

					$scope.init=function(){
						ensureAuthentication();
					};

					$scope.init();
	}]);

})();