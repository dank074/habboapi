angular.module('app').directive('clientRoom', function()
{
    return {
		restrict: 'E',
		replace: false,
		controller: ClientRoomController
	}

    function ClientRoomController(AppConstants, $localStorage, $scope)
	{
        'ngInject';

		// rCRON to room
    }
});