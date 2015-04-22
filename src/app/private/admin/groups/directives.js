angular.module('private.admin.groups.directives', [])
    .directive('adminGroupsIndex', function() {
        return {
            templateUrl: 'app/private/admin/groups/directives.tmpl/index.html',
            controller: "AdminGroupsIndexController as adminGroupsIndexCtrl"
        };
    })
    .controller("AdminGroupsIndexController", function AdminGroupsIndexController($rootScope, Flash, GroupsModel) {
        var ctrl = this;
        ctrl.groups = [];
        ctrl.updateGroups = function(){
            GroupsModel.getGroups().then(function(response){
                if(!response.isErroneous()){
                    ctrl.groups = response.data;
                }else{
                    response.flash();
                }
            });
        };
        ctrl.updateGroups();
    })
    .directive('adminGroupsList', function(Flash) {
        return {
            templateUrl: 'app/private/admin/groups/directives.tmpl/list.html',
            scope: {
                groups: "="
            },
            link: function(scope, element, attrs) {
                // TODO
            }
        };
    })