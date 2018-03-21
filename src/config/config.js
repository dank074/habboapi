import states from './states.json';
import translationEnglish from '../../translation.json';

export default function Config($locationProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider, $stateProvider, $mdAriaProvider)
{
    'ngInject';
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise('/login');
    $urlRouterProvider.when('/me', '/home/me');
    $urlRouterProvider.when('/community', '/community/home');
    $urlRouterProvider.when('/community/news', '/community/news/latest');
    $urlRouterProvider.when('/news', '/community/news/latest');
    $urlRouterProvider.when('/client', '/client/');

    $translateProvider.translations('en', translationEnglish);
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.usePostCompiling(true);

    $mdThemingProvider.disableTheming();

    if(states != null || states.length != 0)
	{
		angular.forEach(states, (value, key) =>
		{
			$stateProvider.state(value.name, value);
		});
	}

    $mdAriaProvider.disableWarnings();
}