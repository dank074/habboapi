angular.module('app').controller('SettingsController', function(UtilityService, UserService, $localStorage, $stickyState, $scope)
{
	$scope.password_details = {
		new_password: null,
		new_cpassword: null,
		password: null
	};

	$scope.email_details = {
		new_email: null,
		new_cemail: null,
		password: null
	};

	$scope.update_password = function()
	{
		if($scope.password_details.new_password == '' || null || $scope.password_details.new_cpassword == '' || null || $scope.password_details.password == '' || null || $scope.password_details.new_password != $scope.password_details.new_cpassword) return UtilityService.alert('Your password couldn\'t be updated, please try again.');

		return UserService.update_password($scope.password_details.new_password, $scope.password_details.password)

		.then(function resolve()
		{
			$scope.password_details.new_password = null;
			$scope.password_details.new_cpassword = null;
			$scope.password_details.password = null;

			return UtilityService.alert('Your password has been updated!');
		},

		function reject(err)
		{
			$scope.password_details.password = null;

			return UtilityService.alert('Your password couldn\'t be updated, please try again.');
		});
	};

	$scope.update_email = function()
	{
		if($scope.email_details.new_email == '' || null || $scope.email_details.new_cemail == '' || null || $scope.email_details.password == '' || null || $scope.email_details.new_email != $scope.email_details.new_cemail) return UtilityService.alert('Your email couldn\'t be updated, please try again.');

		return UserService.update_email($scope.email_details.new_email, $scope.email_details.password)

		.then(function resolve()
		{
			$localStorage.current_user.user_info.mail = $scope.email_details.new_email;

			$scope.email_details.new_email = null;
			$scope.email_details.new_cemail = null;
			$scope.email_details.password = null;

			return UtilityService.alert('Your email has been updated!');
		},

		function reject(err)
		{
			$scope.email_details.password = null;
			
			return UtilityService.alert('Your email couldn\'t be updated, please try again.');
		});
	};

	$scope.update_client = function()
	{
		return UserService.update_settings($localStorage.current_user.user_info.settings)

		.then(function resolve()
		{
			$stickyState.reset('client');
			return UtilityService.alert('Your client settings have been updated! You must reload the client for your changes to take effect.');
		},

		function reject(err)
		{
			return UtilityService.alert('Your client settings couldn\'t be updated, please try again.');
		});
	};
});