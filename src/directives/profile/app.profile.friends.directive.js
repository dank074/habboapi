angular.module('app').directive('profileFriends', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            friends: '=friends'
        },
		templateUrl: 'profile/profile.friends.card.html',
		controller: ProfileFriendsController
	}

    function ProfileFriendsController(AppConstants, $mdDialog, $state, $scope)
	{
        'ngInject';

        $scope.showAll = function(event)
        {
            $mdDialog.show({
                locals: {state: $state, friends: $scope.friends},
                controller: dialogController,
                templateUrl: 'profile/profile.friends.card.dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        var dialogController = function($scope, state, friends)
        {
            $scope.friends  = friends;

            $scope.showProfile = function(user_name)
            {
                state.go('profile', {username: user_name});
                $mdDialog.cancel();
            };

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
});