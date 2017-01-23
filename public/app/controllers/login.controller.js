
	define(['app'], function(app)
	{
		function LoginController($scope, $state, AuthenticationFactory, Utilities)
		{
			$scope.login = function(data)
			{
				AuthenticationFactory.login({
					user_name: data.user_name,
					user_pass: data.user_pass
				})

				.then(function(session)
				{
					return $state.go('me');
				})

				.catch(function(err)
				{
					Utilities.alert({
						textContent: 'That login was invalid'
					});

					return $scope.login_details = null;
				});
			};
		}

		LoginController.inject = ['$scope', '$state', 'AuthenticationFactory', 'Utilities'];

		app.controller('LoginController', LoginController)
	});