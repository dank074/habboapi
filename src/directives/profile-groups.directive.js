import angular from 'angular';

class ProfileGroups
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            groups: '=groups',
        };
		this.templateUrl = 'profile/profile.groups.card.html';
    }

    controller(AppConstants, $mdDialog, $state, $scope)
    {
        'ngInject';

		$scope.showAll = (event) =>
        {
            $mdDialog.show({
                locals: {state: $state, groups: $scope.groups},
                controller: dialogController,
                templateUrl: 'profile/profile.groups.card.dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        let dialogController = function($scope, state, groups)
        {
            $scope.groups = groups;

            $scope.showGroup = (group_id) =>
            {
                state.go('group', {id: group_id});
                $mdDialog.cancel();
            };

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
}

export default ProfileGroups;