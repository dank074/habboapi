import angular from 'angular';

class GroupMembers
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            members: '=members',
        };
		this.templateUrl = 'group/group.members.card.html';
    }

    controller(AppConstants, $mdDialog, $state, $scope)
    {
        'ngInject';

		$scope.showAll = (event) =>
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

        let dialogController = function($scope, state, members)
        {
            $scope.members = members;

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

export default GroupMembers;