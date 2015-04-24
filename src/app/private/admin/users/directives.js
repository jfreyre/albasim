angular.module('private.admin.users.directives', [
    'wegas.behaviours.repeat.autoload'
])
    .directive('adminUsersIndex', function() {
        return {
            templateUrl: 'app/private/admin/users/directives.tmpl/index.html',
            controller: "AdminUsersIndexController as AdminUsersIndexCtrl"
        };
    })
    .controller("AdminUsersIndexController", function AdminUsersIndexController($scope, $rootScope, Flash, UsersModel) {
        var ctrl = this,
        initMaxUsersDisplayed = function() {
            if ($scope.users.length > 12) {
                $scope.maxUsersDisplayed = 10;
            } else {
                $scope.maxUsersDisplayed = $scope.users.length;
            }
        };
        $scope.maxUsersDisplayed = null;
        $scope.users = [];

        ctrl.updateDisplay = function() {
            if ($scope.maxUsersDisplayed == null) {
                initMaxUsersDisplayed();
            }
            if ($scope.maxUsersDisplayed >= $scope.users.length) {
                $scope.maxUsersDisplayed = $scope.users.length;
            } else {
                $scope.maxUsersDisplayed += 15;
            }

        };


        ctrl.updateUsersList = function() {
            UsersModel.getUsers().then(function(response) {
                if (response.isErroneous()) {
                    response.flash();
                } else {
                    $scope.users = response.data || [];
                    ctrl.updateDisplay();
                }
            });
        };

        $scope.deleteUser = function(id) {
            UsersModel.getUser(id).then(function(response) {
                if (!response.isErroneous()) {
                    var user = response.data;
                    UsersModel.deleteUser(user).then(function (response) {
                        response.flash();
                        ctrl.updateUsersList();
                    });
                }
            });
        };

        $rootScope.$on('changeLimit', function(e, hasNewData) {
            if (hasNewData) {
                ctrl.updateUsersList();
            }
        });

        ctrl.updateDisplay();
        ctrl.updateUsersList();
    })
    .directive('adminUsersList', function(Flash) {
        return {
            templateUrl: 'app/private/admin/users/directives.tmpl/list.html',
            scope: false,
            require: "^adminUsersIndex",
            link: function(scope, element, attrs, parentCtrl) {
                // TODO
            }
        };
    })
    .directive('adminEditUserForm', function(UsersModel, $stateParams) {
        return {
            templateUrl: 'app/private/admin/users/directives.tmpl/edit.html',
            link: function(scope, element, attrs, parentCtrl) {

                UsersModel.getFullUser($stateParams.id).then(function(response) {
                    if (!response.isErroneous()) {
                        scope.user = response.data;
                    }
                });
                scope.save = function () {
                    UsersModel.updateUser(scope.user.account).then(function (response) {
                        if (!response.isErroneous()) {
                            response.flash();
                        }
                    });
                }
            }
        }
    })
    .directive('adminUserGroups', function(GroupsModel) {
        return {
            templateUrl: "app/private/admin/users/directives.tmpl/groups.html",
            scope: {
                user: '='
            },
            link: function(scope, element, attrs) {
                GroupsModel.getGroups().then(function(response) {
                    console.log(response);
                    if (!response.isErroneous()) {
                        console.log(scope.groups);
                        scope.groups = response.data;
                    } else {
                        response.flash();
                    }
                });

                // Create a new
                scope.addGroup = function() {
                    console.log("Add");
                    var new_group = angular.copy(scope.groups[0])
                    scope.user.account.roles.push(new_group);
                }
            }
        }
    })
    .directive('adminUserGroup', function(GroupsModel) {
        return {
            templateUrl: "app/private/admin/users/directives.tmpl/group.html",
            scope: {
                currentGroup: '=',
                user: '='
            },
            link: function(scope, element, attrs, parentCtrl) {
                GroupsModel.getGroups().then(function(response) {
                    if (!response.isErroneous()) {
                        scope.groups = response.data;
                    } else {
                        response.flash();
                    }
                });

                scope.selectedGroup = scope.currentGroup;

                // Updating user groups when user select another role in the list
                scope.$watch('selectedGroup', function() {
                    var index = scope.user.account.roles.indexOf(scope.currentRole);
                    if (index > -1) {
                        scope.user.account.roles[index] = scope.selectedRole;
                        scope.currentRole = scope.selectedRole;
                    }

                });

                scope.removeRole = function() {
                    scope.user.account.roles = _(scope.user.account.roles).filter(function (r) {
                        return r.id != scope.selectedRole.id
                    });
                }
            }
        }
    });