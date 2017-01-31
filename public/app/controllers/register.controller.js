
	define(['app'], function(app)
	{
		function RegisterController($rootScope, $scope, $state, $http, AuthenticationFactory, UserFactory, Utilities)
		{
			$scope.register = function(data)
			{
				var user_name 	= (data.user_name == undefined || null) ? null : data.user_name,
					user_email	= (data.user_email == undefined || null) ? null : data.user_email,
					user_pass	= (data.user_pass == undefined || null) ? null : data.user_pass,
					user_cpass	= (data.user_cpass == undefined || null) ? null : data.user_cpass;

				if(user_name == null || user_email == null || user_pass == null || user_cpass == null || user_pass != user_cpass) return false;

				UserFactory.add_user(user_name, user_email, user_pass)

				.then(function(response)
				{
					return AuthenticationFactory.login(user_name, user_pass);
				})

				.then(function(session)
				{
					return $state.go('me');
				})

				.catch(function(err)
				{
					return Utilities.alert({
						textContent: 'Something went wrong, please try again'
					});
				});
			};

			$scope.clear_form = function()
			{
				$scope.register_details.user_name = null;
				$scope.register_details.user_email = null;
				$scope.register_details.user_pass = null;
				$scope.register_details.user_cpass = null;
			};
		}

		RegisterController.inject = ['$rootScope', '$scope', '$state', '$http', 'AuthenticationFactory', 'UserFactory', 'Utilities'];

		app.controller('RegisterController', RegisterController)
	});