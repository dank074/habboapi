
	require.config({
		baseUrl: '/app'
	});

	require(
	[
		'app',
		'factories/utilities.factory',
		'factories/authentication.factory',
		'factories/session.factory',
		'factories/user.factory',
		'controllers/login.controller',
		'controllers/register.controller',
		'controllers/me.controller',
		'directives/logout.directive',
		'directives/check-username.directive',
		'directives/check-email.directive',
		'directives/compare-password.directive',
		'directives/menu-bar.directive'
	],
	
	function()
	{
		angular.bootstrap(document, ['app']);
    });
