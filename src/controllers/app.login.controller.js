angular.module('app').controller('LoginController', function(UtilityService, AuthenticationService, $stateParams, $state, $scope)
{
	$scope.login_details = {};
	$scope.login_details.user_name = ($stateParams.login_username == undefined || null) ? null : $stateParams.login_username;
	$scope.login_details.user_pass = null;
	
	$scope.login = function()
	{
		if($scope.login_details.user_name == '' || null || $scope.login_details.user_pass == '' || null) return;
		
		return AuthenticationService.login($scope.login_details.user_name, $scope.login_details.user_pass)
		
		.then(function resolve(session)
		{
			return $state.go('me');
		},
		
		function reject(err)
		{
			$scope.login_details.user_name = null;
			$scope.login_details.user_pass = null;

			return UtilityService.alert('That login was invalid');
		});
	};
});