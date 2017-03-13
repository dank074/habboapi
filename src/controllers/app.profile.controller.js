angular.module('app').controller('ProfileController', function(AppConstants, $window, $stateParams, $http, $scope)
{
    $scope.profile_username = ($stateParams.username == undefined || null) ? null : $stateParams.username;

    if($scope.profile_username == '' || null) return $window.history.back();

    $http.post(AppConstants.api + '/controller/profile/profile_info', {user_name: $scope.profile_username})
    
    .then(function resolve(res)
	{
		if(res.data.profile_info == undefined || null) return $window.history.back();

        $scope.profile_info = res.data.profile_info;
    },
    
    function reject(res)
	{
		return $window.history.back();
    });
});