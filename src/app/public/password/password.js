angular.module('public.password', [
    'public.password.directives'
])
.factory('WegasModalService', function($q, $animate, ModalService){
    var service = angular.copy(ModalService);

    service.displayAModal = function(options) {
        var deferred = $q.defer();
        ModalService.showModal(options).then(function(modal) {
            var box = $(".modal"),
                shadow = $(".shadow");
            $(document).keyup(function(e) {
                if (e.keyCode == 27 && box.length >= 1) {
                    modal.close.then(function() {
                        alert('dddd');
                    });
                    // $animate.removeClass(shadow, "shadow--show");
                    // $animate.removeClass(box, "modal--open");
                }
            });
            $animate.addClass(box, "modal--open");
            $animate.addClass(shadow, "shadow--show");
            return deferred.resolve();
        });
        return deferred.promise;
    };

    return service;
})
.config(function ($stateProvider) {
    $stateProvider
        .state('wegas.public.password', {
            url: '/password',
            views: {
        		"modal@wegas.public" :{
            		controller: 'PublicPasswordModalController'
            	}
            }

        })
    ;
})
.controller("PublicPasswordModalController", function PublicPasswordModalController($animate, $state, WegasModalService) {
        WegasModalService.displayAModal({
            templateUrl: 'app/public/password/password.tmpl.html',
            controller: "ModalsController as modalsCtrl"
        }).then(function(modal) {
            alert('a');
            modal.close.then(function(result) {
                $state.go("^");
            });
        });
    })
;