
	define(['states'], function(states)
	{
		var app = angular.module('app', ['ui.router', 'ngMessages', 'ngStorage', 'ngMaterial']);
		
		app.config([
			'$httpProvider',
			'$urlRouterProvider',
			'$stateProvider',
			'$mdThemingProvider',
		
		function($httpProvider, $urlRouterProvider, $stateProvider, $mdThemingProvider)
		{
			$mdThemingProvider.theme('default').primaryPalette('teal');

			if(states.defaultState != null) $urlRouterProvider.otherwise(states.defaultState);

			if(states.states != undefined && states.states != null)
			{
				angular.forEach(states.states, function(state, path)
				{
					$stateProvider.state(path,
					{
						abstract: (state.abstract == true) ? true : false,
						name: state.name,
						page_name: state.page_name,
						url: state.url,
						templateUrl: state.templateUrl,
						controller: state.controller,
						login_required: (state.login_required == true || state.page_permission != null) ? true : false,
						page_permission: state.page_permission
					});
				});
			}
		}]);

		app.run([
			'$rootScope',
			'$state',
			'$localStorage',
			'Authenticator',
			'Permission',
		
		function($rootScope, $state, $localStorage, Authenticator, Permission)
		{
			$rootScope.$on('$stateChangeStart', function(event, next, current)
			{
				if(next.name == 'login')
				{
					if($localStorage.current_user == undefined || null) return next;

					event.preventDefault();
					return $state.go('app.dashboard');
				}

				Authenticator.validate_session()

				.then(function(session)
				{
					if(next.page_permission == null || Permission.has_permission(next.page_permission) == true) return next;

					event.preventDefault();
					return $state.go('app.not_found');
				})

				.catch(function(err)
				{
					if(next.name == 'login') return next;

					event.preventDefault();
					return $state.go('login');
				});
			});

			$rootScope.$on('$stateChangeSuccess', function (event, next, current)
			{
				$rootScope.page_name = next.page_name;
			});

			$rootScope.$on('$stateChangeError', function(event, next, current)
			{
				event.preventDefault();
				
				if($localStorage.current_user == undefined || $localStorage.current_user == null || $localStorage.current_user.login_status == false) return $state.go('login');
				
				return $state.go('app.not_found');
			});
		}]);

		return app;
	});