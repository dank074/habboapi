import states from './states.json';

function Config($urlRouterProvider, $stateProvider, $locationProvider, $stickyStateProvider, $mdThemingProvider)
{
	'ngInject';

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');
	
	$mdThemingProvider.theme('default').primaryPalette('teal');

	$urlRouterProvider.otherwise('/login');

	if(states.states != null || states.states.length != 0)
	{
		angular.forEach(states.states, (value, key) =>
		{
			$stateProvider.state(value.name, value);
		});
	}
}

export default Config;