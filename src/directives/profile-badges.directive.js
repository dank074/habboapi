import angular from 'angular';

class ProfileBadges
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            badges: '=badges',
        };
		this.templateUrl = 'profile/profile.badges.card.html';
    }

    controller(AppConstants, $mdDialog, $scope)
    {
        'ngInject';

		$scope.showAll = (event) =>
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

        let dialogController = function($scope, badges)
        {
            $scope.badges = badges;

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
}

export default ProfileBadges;