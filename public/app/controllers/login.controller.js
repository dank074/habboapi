
	define(['app'], function(app)
	{
		function LoginController($scope, $state, Authenticator, Utilities)
		{
			$scope.site_name = 'HabboAPI';
			
			$scope.login = function(data)
			{
				Authenticator.login({
					user_name: data.user_name,
					user_pass: data.user_pass
				})

				.then(function(session)
				{
					$state.go('app.dashboard');
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
				return;
			};
		}

		LoginController.inject = ['$scope', '$state', 'Authenticator', 'Utilities'];

		app.controller('LoginController', LoginController)
	});