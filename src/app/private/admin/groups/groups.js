angular.module('private.admin.groups', [
    'private.admin.groups.edit'
    ])
.config(function ($stateProvider) {
    $stateProvider
        .state('wegas.private.admin.groups', {
            url: '/groups',
            views: {
                'admin-container': {
                    controller: 'AdminGroupsCtrl as adminGroupsCtrl',
                    templateUrl: 'app/private/admin/groups/groups.tmpl.html'
                }
            }
        })
    ;
})
.controller('AdminGroupsCtrl', function AdminGroupsCtrl(GroupsModel) {
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
;