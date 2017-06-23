import states from './states.json';
import translationEnglish from '../../translation-en.json';

function Config($locationProvider, $translateProvider, $mdThemingProvider, $urlRouterProvider, $stateProvider, $mdAriaProvider)
{
    'ngInject';
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/login');

    $translateProvider.translations('en', translationEnglish);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.usePostCompiling(true);
    
    $mdThemingProvider.theme('default').primaryPalette('teal');

    if(states.main != null || states.main.length != 0)
	{
		angular.forEach(states.main, (value, key) =>
		{
			$stateProvider.state(value.name, value);
		});
	}

    $mdAriaProvider.disableWarnings();
}

export default Config;