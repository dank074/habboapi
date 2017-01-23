
	define(['app'], function(app)
	{
		function RegisterController($scope, $state, Utilities)
		{
			$scope.register = function(data)
			{
				$http.post('controller/register/register', data)
				
				.then(function(response)
				{
					return "yes";
				})
				
				.catch(function(err)
				{
					Utilities.alert({
						textContent: 'That registration was invalid'
					});
				});
			};
		}

		RegisterController.inject = ['$scope', '$state', 'Utilities'];

		app.controller('RegisterController', RegisterController)
	});