angular.module('private.trainer.sessions.archives', [
    'private.trainer.sessions.archives.directives'
])
    .config(function($stateProvider) {
        $stateProvider
            .state('wegas.private.trainer.sessions.archives', {
                url: '/archives',
                views: {
                    'modal@wegas.private': {
                        controller: 'TrainerSessionsArchivesController'
                    }
                }
            });
    }).controller("TrainerSessionsArchivesController", function TrainerSessionsArchivesController($animate, $state, ModalService) {
        ModalService.showModal({
            templateUrl: 'app/private/trainer/sessions/archives/archives.tmpl.html',
            controller: "ModalsController as modalsCtrl"
        }).then(function(modal) {
            var box = $(".modal"),
                shadow = $(".shadow");
            $animate.addClass(box, "modal--open");
            $animate.addClass(shadow, "shadow--show");

            modal.close.then(function(result) {
                $state.go("^");
            });
        });
    });