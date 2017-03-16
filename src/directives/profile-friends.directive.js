import angular from 'angular';

class ProfileFriends
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            friends: '=friends',
        };
		this.templateUrl = 'profile/profile.friends.card.html';
    }

    controller(AppConstants, $mdDialog, $state, $scope)
    {
        'ngInject';

		$scope.showAll = (event) =>
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

        let dialogController = function($scope, state, friends)
        {
            $scope.friends = friends;

            $scope.showProfile = (user_name) =>
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
}

export default ProfileFriends;