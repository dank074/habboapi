
	require.config({
		baseUrl: '/app'
	});

	require(
	[
		'app',
		'factories/utilities.factory',
		'factories/authentication.factory',
		'controllers/login.controller',
		'controllers/register.controller',
		'controllers/me.controller',
		'directives/logout.directive',
		'directives/check-username.directive',
		'directives/check-email.directive',
		'directives/menu-bar.directive'
	],
	
	function()
	{
		angular.bootstrap(document, ['app']);
    });
