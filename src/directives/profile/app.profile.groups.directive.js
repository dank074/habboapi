angular.module('app').directive('profileGroups', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            groups: '=groups'
        },
		templateUrl: 'profile/profile.groups.card.html',
		controller: ProfileGroupsControlller
	}

    function ProfileGroupsControlller(AppConstants, $mdDialog, $state, $scope)
	{
        'ngInject';

        $scope.showAll = function(event)
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

        var dialogController = function($scope, state, groups)
        {
            $scope.groups   = groups;

            $scope.showGroup = function(group_id)
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
});