angular.module('app').directive('profileRooms', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            rooms: '=rooms'
        },
		templateUrl: 'profile/profile.rooms.card.html',
		controller: ProfileRoomsControlller
	}

    function ProfileRoomsControlller(AppConstants, $mdDialog, $state, $scope)
	{
        'ngInject';

        $scope.showAll = function(event)
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

        var dialogController = function($scope, state, rooms)
        {
            $scope.rooms    = rooms;

            $scope.showRoom = function(room_id)
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
});