
	define(['app'], function(app)
	{
		function LogoutDirective($state, Authenticator, Utilities)
		{
			return {
				restrict: 'A',
				link: function(scope, element, attrs)
				{
					element.on('click', function(event)
					{
						Utilities.confirm({
							textContent: 'Are you sure you would like to logout?',
							ok: 'Logout'
						})

						.then(function()
						{
							return Authenticator.logout();
						})

						.then(function()
						{
							event.preventDefault();
							return $state.go('login');
						});
					});
				}
			}
        };

		LogoutDirective.inject = ['$state', 'Authenticator', 'Utilities'];

		app.directive('appLogout', LogoutDirective);
	});