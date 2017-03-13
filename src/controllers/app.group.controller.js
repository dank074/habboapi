angular.module('app').controller('GroupController', function(AppConstants, $window, $stateParams, $http, $scope)
{
    $scope.group_id = ($stateParams.id == undefined || null) ? null : $stateParams.id;

    if($scope.group_id == '' || null) return $window.history.back();
    
    $http.post(AppConstants.api + '/controller/group/group_info', {group_id: $scope.group_id})
    
    .then(function resolve(res)
    {
        if(res.data.group_info == undefined || null) return $window.history.back();
        
        $scope.group_info = res.data.group_info;
    },
    
    function reject(res)
	{
        return $window.history.back();
    });
});