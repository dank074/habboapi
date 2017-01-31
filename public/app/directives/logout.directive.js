
	define(['app'], function(app)
	{
		function LogoutDirective($state, Utilities, SessionFactory)
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
							return SessionFactory.destroy_session();
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

		LogoutDirective.inject = ['$state', 'Utilities', 'SessionFactory'];

		app.directive('appLogout', LogoutDirective);
	});