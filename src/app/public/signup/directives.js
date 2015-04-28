angular.module('public.signup.directives', [])
    .directive('publicSignupIndex', function() {
        return {
        	scope: {
                close: "&"
            },
            controller: 'PublicSignupController as publicSignupCtrl',
    		templateUrl: 'app/public/signup/directives.tmpl/index.html'
        };
    })
    .controller('PublicSignupController', function PublicSignupController($scope, Auth, Flash) {
        var ctrl = this;
	    $scope.signup = function () {
	        if (this.p1 && this.p1.length > 3) {
	            if (this.p1 === this.p2) {
	                Auth.signup(this.email, this.username, this.p1, this.firstname, this.lastname).then(function(response) {
	                    response.flash();
	                });
	            } else {
	                Flash('danger', 'Passwords are different');
	            }
	        } else {
	            Flash('danger', 'Your password should contains at least 3 characters');
	        }
	    }
    });