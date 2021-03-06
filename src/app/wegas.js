var ServiceURL = "/Wegas/",
    MAX_DISPLAYED_CHARS = 32;

angular.module('Wegas', [
    'flash',
    'ui.router',
    'ngAnimate',
    'angular-loading-bar',
    'angularModalService',
    'wegas.service.responses',
    'wegas.service.auth',
    'wegas.directives.illustrations',
    'wegas.behaviours.confirm',
    'wegas.behaviours.modals',
    'wegas.behaviours.tools',
    'public',
    'private',
    'autologin'
])
.config(function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    // Configurate loading bar
    cfpLoadingBarProvider.latencyThreshold = 1000;
    cfpLoadingBarProvider.includeSpinner = true;
    
    $stateProvider
        .state('wegas', {
            url: '/',
            views: {
                'main@': {
                    controller: 'WegasMainCtrl',
                    templateUrl: 'app/wegas.tmpl.html'
                }
            }
        })
    ;
    $urlRouterProvider.otherwise('/');
})
.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
    $state.previous = fromState;
  });
})
.controller('WegasMainCtrl', function WegasMainCtrl($state, Auth) {
    Auth.getAuthenticatedUser().then(function(user){
    	if(user == null){
    		$state.go("wegas.public");
    	}else{
    		if(user.isScenarist || user.isTrainer){
                        $state.go("wegas.private.trainer");
                }else{
                        $state.go("wegas.private.player");
                }
    	}
    });
});
