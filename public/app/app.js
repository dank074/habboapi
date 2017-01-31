
	define(['config'], function(config)
	{
		var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngMessages', 'ngStorage', 'ngMaterial']);
		
		app.config([
			'$urlRouterProvider',
			'$stateProvider',
			'$mdThemingProvider',
		
		function($urlRouterProvider, $stateProvider, $mdThemingProvider)
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
			'SessionFactory',
			'UserFactory',
		
		function($rootScope, $state, $localStorage, SessionFactory, UserFactory)
		{
			$rootScope.app_config = config.config;
			
			$rootScope.$on('$stateChangeStart', function(event, next, current)
			{
				SessionFactory.validate_session()
				
				.then(function(session)
				{
					$rootScope.current_user = session;

					UserFactory.user_info($localStorage.current_user.user_id)

					.then(function(user_info)
					{
						$rootScope.current_user.user_info = user_info;
					})

					.catch(function(err)
					{
						$rootScope.current_user.user_info = null;
					});

					if(next.name == 'login' || next.name == 'register')
					{
						event.preventDefault();
						return $state.go('me');
					}

					return next;
				})
				
				.catch(function(err)
				{
					$rootScope.current_user = null;

					if(next.login_required == true)
					{
						event.preventDefault();
						return $state.go('login');
					}

					return next;
				});
			});
		}]);

		return app;
	});