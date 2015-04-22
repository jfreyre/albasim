'use strict';
angular.module('wegas.models.groups', [])
    .service('GroupsModel', function($http, $q, Responses, Auth) {
        var model = this,
            groups = null,
            loadingGroups = false;
            /* Cache all scenarios in a list */
            cacheGroups = function() {
                var deferred = $q.defer(),
                	url = "rest/Role";
                
                $http.get(ServiceURL + url, {
                    "headers": {
                        "managed-mode": "true"
                    }
                }).success(function(data) {
                    if (data.events !== undefined && data.events.length == 0) {
                        groups = data.entities;
                        deferred.resolve(Responses.success("Profile loaded", groups));
                    } else if (data.events !== undefined) {
                        deferred.resolve(Responses.danger(data.events[0].exceptions[0].message, false));
                    } else {
                        deferred.resolve(Responses.danger("Error during groups loading", false));
                    }
                }).error(function(data) {
                    if (data.events !== undefined && data.events.length > 0) {
                        deferred.resolve(Responses.danger(data.events[0].exceptions[0].message, false));
                    } else {
                        deferred.resolve(Responses.danger("Error during groups loading", false));
                    }
                });
                return deferred.promise;
            };

        model.getGroups = function() {
            var deferred = $q.defer();
            Auth.getAuthenticatedUser().then(function(user) {
                if (user != null) {
                	if(user.isAdmin){
			            if (groups != null) {
			                deferred.resolve(Responses.success("Groups loaded", groups));		                
			            } else {
			            	loadingGroups = true;
			            	cacheGroups().then(function(){
			            		loadingGroups = false;
			                	deferred.resolve(Responses.success("Groups loaded", groups));		                
			            	});
			            }
		        	}else{
	                	deferred.resolve(Responses.success("You need to be admin", false));
		        	}
	            }else{
	                deferred.resolve(Responses.success("You need to be logged", false));
	            }
	        });
            return deferred.promise;
        };
    });