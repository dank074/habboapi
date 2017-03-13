var states = require('./app.states.json').states;

angular.module('app').config(function($urlRouterProvider, $stateProvider, $stickyStateProvider, $mdThemingProvider)
{
	$mdThemingProvider.theme('default').primaryPalette('teal');

	$urlRouterProvider.otherwise('/login');

	if(states != null || states.length != 0)
	{
		angular.forEach(states, function(value, key)
		{
			$stateProvider.state(value.name, value);
		});
	}
});