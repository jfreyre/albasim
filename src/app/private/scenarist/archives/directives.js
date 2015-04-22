angular.module('private.scenarist.archives.directives', [])
    .directive('scenaristScenariosArchivesIndex', function() {
        return {
            scope: {
                close: "&"
            },
            templateUrl: 'app/private/scenarist/archives/directives.tmpl/index.html',
            controller: "ScenaristArchivesIndexController as scenaristArchivesIndexCtrl"
        };
    }).controller("ScenaristArchivesIndexController", function ScenaristArchivesIndexController($rootScope, $scope, ScenariosModel, Flash) {
        var ctrl = this;
        ctrl.archives = [];

        ctrl.updateScenarios = function() {
        	ScenariosModel.getScenarios("BIN").then(function(response) {
                ctrl.archives = response.data || [];
                if (ctrl.archives.length == 0) {
                    $scope.close();
                }
            });
        };

        ctrl.unarchiveScenario = function(scenarioToUnarchive) {
            if (scenarioToUnarchive) {
                ScenariosModel.unarchiveScenario(scenarioToUnarchive).then(function(response) {
                    if (!response.isErroneous()) {
                        $rootScope.$emit('changeScenarios', true);
                    }else{
                        response.flash();
                    }
                });
            } else {
                Flash.danger("No scenario choosed");
            }
        };

        ctrl.deleteArchivedScenario = function(scenarioToDelete) {
            if (scenarioToDelete) {
                ScenariosModel.deleteArchivedScenario(scenarioToDelete).then(function(response) {
                    if (!response.isErroneous()) {
                        $rootScope.$emit('changeScenarios', true);
                    }else{
                        response.flash();
                    }
                });
            } else {
                Flash.danger("No scenario choosed");
            }
        };

        ctrl.deleteArchivedScenarios = function() {
            if (ctrl.archives.length > 0) {
                ScenariosModel.deleteArchivedScenarios().then(function(response) {
                    if (!response.isErroneous()) {
                        $rootScope.$emit('changeScenarios', true);
                    }else{
                        response.flash();
                    }
                });
            } else {
                Flash.danger("No scenarios archived");
            }
        };

        /* Listen for new scenarios */
        $rootScope.$on('changeScenarios', function(e, hasNewData) {
            if (hasNewData) {
                ctrl.updateScenarios();
            }
        });

        ctrl.updateScenarios();
    })
    .directive('scenaristScenariosArchivesList', function() {
        return {
            scope: {
                scenarios: "=",
                unarchive: "=",
                delete:"="
            },
            templateUrl: 'app/private/scenarist/archives/directives.tmpl/list.html'
        };
    });