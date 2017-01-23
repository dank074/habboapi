
	define(['app'], function(app)
	{
		function LogoutDirective($state, AuthenticationFactory, Utilities)
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
							return AuthenticationFactory.logout();
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

		LogoutDirective.inject = ['$state', 'AuthenticationFactory', 'Utilities'];

		app.directive('appLogout', LogoutDirective);
	});