angular.module('app').controller('RegisterController', function(UtilityService, UserService, AuthenticationService, $state, $scope)
{
	$scope.register_details             = {};
    $scope.register_details.user_name   = null;
    $scope.register_details.user_email  = null;
    $scope.register_details.user_pass   = null;
    $scope.register_details.user_cpass  = null;
	
	$scope.register = function()
    {
        if($scope.register_details.user_name == '' || null || $scope.register_details.user_email == '' || null || $scope.register_details.user_pass == '' || null || $scope.register_details.user_cpass == '' || null || $scope.register_details.user_pass != $scope.register_details.user_cpass) return UtilityService.alert('Something is missing, please try again');
        
        return UserService.add_user($scope.register_details.user_name, $scope.register_details.user_email, $scope.register_details.user_pass)
        
        .then(function resolve(user)
        {
            UtilityService.alert('Account Created! You may now login');
            return $state.go('login', {login_username: $scope.register_details.user_name});
        },
        
        function reject(err)
        {
            return UtilityService.alert('Something went wrong, please try again');
        });
    };
});