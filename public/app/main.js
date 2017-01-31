
	require.config({
		baseUrl: '/app'
	});

	require(
	[
		'app',
		'factories/authenticator.factory',
		'factories/permission.factory',
		'factories/utilities.factory',
		'controllers/login.controller',
		'controllers/main.controller',
		'controllers/dashboard.controller',
		'directives/logout.directive',
		'filters/rank_name.filter'
	],
	
	function()
	{
		angular.bootstrap(document, ['app']);
    });
