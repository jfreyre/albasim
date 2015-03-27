angular
.module('private.scenarist.history.directives', [
    'ngSanitize',
    ])
.directive('scenaristHistoryIndex', function(ScenariosModel){
    return {
        templateUrl: 'app/private/scenarist/history/tmpl/history-index.html',
        controller : function($scope, $stateParams, $sce) {
            var ctrl = this,
            scenarios = [],
            scenario = null,
            versions = [];

            ctrl.scenarioId = $stateParams.scenarioId;

            ctrl.updateVersions = function () {
                ScenariosModel.getVersionsHistory($stateParams.scenarioId).then(function(results) {
                    if (results === false) {
                        window.alert('Whooops.');
                    } else {
                        ctrl.versions = results;
                    }
                });
            }
            ScenariosModel.getScenario($stateParams.scenarioId).then(function (scenario) {
                ctrl.scenario = scenario;
                ctrl.updateVersions();
            });

            $scope.addVersion = function() {
                if($stateParams.scenarioId !== "") {
                    ScenariosModel.addVersionHistory($stateParams.scenarioId).then(function (result) {
                        if (result === true) {
                            ctrl.updateVersions();
                        }
                    });
                }
            };






        }
    };
})
.directive('scenaristHistoryDownload', function(ScenariosModel){
    return {
        templateUrl: 'app/private/scenarist/history/tmpl/history-download.html',
        scope: false,
        require: "^scenaristHistoryIndex",
        link : function(scope, element, attrs, parentCtrl) {

        }
    };
})
.directive('scenaristHistoryDownloadJson', function(ScenariosModel){
    return {
        scope: false,
        link : function(scope, element, attrs, parentCtrl) {
            $jsonElement = element;
            scope.$watch("scenario", function(n,o) {
                if (_.contains([false,undefined], n)) {
                    $jsonElement.addClass('disabled').attr('href', '#');
                } else {
                    var url = ServiceURL + "rest/Export/GameModel/" + n.id + "/" + n.name + ".json";
                    $jsonElement.removeClass('disabled').attr('href', url);
                }
                scope.scenario = n;
            });


        }
    };
})
.directive('scenaristHistoryDownloadPdf', function(ScenariosModel){
    return {
        scope: false,
        link : function(scope, element, attrs, parentCtrl) {
            $pdfElement = element;

            scope.$watch("scenario", function(n,o) {
                if (_.contains([false,undefined], n)) {
                    $pdfElement.addClass('disabled').attr('href', '#');
                } else {
                    var url = ServiceURL + "print.html?gameModelId=" + n.id
                            + "&outputType=pdf&mode=editor&defaultValues=true";
                    $pdfElement.removeClass('disabled').attr('href', url);
                }
                scope.scenario = n;
            });


        }
    };
})
.directive('scenaristHistoryList', function(ScenariosModel){
    return {
        templateUrl: 'app/private/scenarist/history/tmpl/history-list.html',
        scope: false,
        require: "^scenaristHistoryIndex",
        link : function(scope, element, attrs, parentCtrl) {

            scope.$watch(function() {
                return parentCtrl.scenario
            } , function(n,o) {
                scope.scenario = n;
            });
            scope.$watch(function() {
                return parentCtrl.versions
            } , function(n,o) {
                scope.versions = n;
            });

        }
    };
})
.directive('scenaristHistoryCard', function(ScenariosModel){
    return {
        templateUrl: 'app/private/scenarist/history/tmpl/history-card.html',
        scope: false,
        require: "^scenaristHistoryIndex",
        link : function($scope, element, attrs, parentCtrl) {

            $scope.deleteFork = function(name) {
                ScenariosModel.deleteVersionHistory(parentCtrl.scenarioId, name).then(function (result) {
                    if (result === true) {
                        parentCtrl.updateVersions();
                    }
                });
            };

            $scope.createFork = function(name) {
                ScenariosModel.restoreVersionHistory(parentCtrl.scenarioId, name).then(function (result) {
                    if (result !== false) {
                        alert('Le scenario a été dupliqué sous le nom "'+result.name+'"');
                    }
                });
            };

        }
    };
})