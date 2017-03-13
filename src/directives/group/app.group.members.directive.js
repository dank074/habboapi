angular.module('app').directive('groupMembers', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            members: '=members'
        },
		templateUrl: 'group/group.members.card.html',
		controller: GroupMembersController
	}

    function GroupMembersController(AppConstants, $mdDialog, $state, $scope)
	{
        'ngInject';

        $scope.showAll = function(event)
        {
            $mdDialog.show({
                locals: {state: $state, members: $scope.members},
                controller: dialogController,
                templateUrl: 'group/group.members.card.dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        var dialogController = function($scope, state, members)
        {
            $scope.members  = members;

            $scope.showProfile = function(username)
            {
                state.go('profile', {username: username});
                $mdDialog.cancel();
            };

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
});