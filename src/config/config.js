import angular from 'angular';
import states from './states.json';
import translationEnglish from './translation-en.json';

function Config($urlRouterProvider, $urlMatcherFactoryProvider, $stateProvider, $locationProvider, $translateProvider, $stickyStateProvider, $mdThemingProvider, $mdAriaProvider)
{
	'ngInject';

	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('');

	$translateProvider.translations('en', translationEnglish).preferredLanguage('en');

	$translateProvider.translations('en', translationEnglish);
	$translateProvider.preferredLanguage('en');
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.usePostCompiling(true);

	var forum_rename = {
		encode: (str) => { return str && str.replace(/ /g, "-"); },
		decode: (str) => { return str && str.replace(/-/g, " "); },
		is: angular.isString,
		pattern: /[^/]+/
	};
	
	$urlMatcherFactoryProvider.type('forumRename', forum_rename);
	
	$mdThemingProvider.theme('default').primaryPalette('teal');

	$urlRouterProvider.otherwise('/login');

	if(states.states != null || states.states.length != 0)
	{
		angular.forEach(states.states, (value, key) =>
		{
			$stateProvider.state(value.name, value);
		});
	}

	$mdAriaProvider.disableWarnings();
}

export default Config;