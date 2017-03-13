angular.module('app').directive('profileBadges', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            badges: '=badges'
        },
		templateUrl: 'profile/profile.badges.card.html',
		controller: ProfileBadgesController
	}

    function ProfileBadgesController(AppConstants, $mdDialog, $scope)
	{
        'ngInject';

        $scope.showAll = function(event)
        {
            $mdDialog.show({
                locals: {badges: $scope.badges},
                controller: dialogController,
                templateUrl: 'profile/profile.badges.card.dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        var dialogController = function($scope, badges)
        {
            $scope.badges   = badges;

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
});