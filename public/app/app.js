
	define(['config'], function(config)
	{
		var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngMaterial']);
		
		app.config([
			'$httpProvider',
			'$urlRouterProvider',
			'$stateProvider',
			'$mdThemingProvider',
		
		function($httpProvider, $urlRouterProvider, $stateProvider, $mdThemingProvider)
		{
			$mdThemingProvider.theme('default').primaryPalette('teal');
			
			$urlRouterProvider.otherwise('/login');

			if(config.navigation_list != undefined || null)
			{
				angular.forEach(config.states, function(value, key)
				{
					$stateProvider.state(value.name,
					{
						abstract: (value.abstract == true) ? true : false,
						name: value.name,
						url: value.url,
						templateUrl: value.templateUrl,
						controller: value.controller,
						login_required: (value.login_required == true) ? true : false
					});
				});
			}
		}]);

		app.run([
			'$rootScope',
			'$state',
			'$localStorage',
			'AuthenticationFactory',
		
		function($rootScope, $state, $localStorage, AuthenticationFactory)
		{
			$rootScope.app_config = config.config;
			
			$rootScope.$on('$stateChangeStart', function(event, next, current)
			{
				$rootScope.current_user = ($localStorage.current_user == undefined || null) ? null : $localStorage.current_user;
				
				if(next.name == 'login' || next.name == 'register')
				{
					if($localStorage.current_user == undefined || null) return next;

					event.preventDefault();
					return $state.go('me');
				}

				if(next.login_required == true)
				{
					if($localStorage.current_user != undefined || null && $localStorage.current_user.login_status == true) return next;

					event.preventDefault();
					return $state.go('login'); 
				}
			});
		}]);

		return app;
	});