angular.module('app').controller('RoomController', function(AppConstants, $state, $stateParams, $http, $scope)
{
    $scope.room_id  = ($stateParams.id == undefined || null) ? null : $stateParams.id;

    if($scope.room_id == '' || null) return $window.history.back();

    $http.post(AppConstants.api + '/controller/room/room_info', {room_id: $scope.room_id})
    
    .then(function resolve(res)
    {
        if(res.data.room_info == undefined || null) return $window.history.back();

        $scope.room_info = res.data.room_info;
    },
    
    function reject(res)
    {
        return $window.history.back();
    });
});