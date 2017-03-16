import angular from 'angular';

class ProfileRooms
{
    constructor()
    {
        this.restrict   = 'E';
        this.replace    = true;
        this.scope      = {
            rooms: '=rooms',
        };
		this.templateUrl = 'profile/profile.rooms.card.html';
    }

    controller(AppConstants, $mdDialog, $state, $scope)
    {
        'ngInject';

		$scope.showAll = (event) =>
        {
            $mdDialog.show({
                locals: {state: $state, rooms: $scope.rooms},
                controller: dialogController,
                templateUrl: 'profile/profile.rooms.card.dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        let dialogController = function($scope, state, rooms)
        {
            $scope.rooms = rooms;

            $scope.showRoom = (room_id) =>
            {
                state.go('room', {id: room_id});
                $mdDialog.cancel();
            };

            $scope.hide = function()
            {
                $mdDialog.hide();
            };
        };
    }
}

export default ProfileRooms;