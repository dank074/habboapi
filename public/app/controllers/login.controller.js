
	define(['app'], function(app)
	{
		function LoginController($scope, $state, AuthenticationFactory, Utilities)
		{
			$scope.login = function(data)
			{
				if(data.user_name == undefined || null || data.user_pass == undefined || null) return;
				
				AuthenticationFactory.login(data.user_name, data.user_pass)

				.then(function(session)
				{
					return $state.go('me');
				})

				.catch(function(err)
				{
					Utilities.alert({
						textContent: 'That login was invalid'
					});

					return $scope.clear_login();
				});
			};

			$scope.clear_login = function()
			{
				$scope.login_details.user_name = null;
				$scope.login_details.user_pass = null;
			};
		}

		LoginController.inject = ['$scope', '$state', 'AuthenticationFactory', 'Utilities'];

		app.controller('LoginController', LoginController)
	});