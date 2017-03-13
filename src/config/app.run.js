angular.module('app').run(function(AppConstants, SessionService, UserService, $stickyState, $rootScope, $state, $localStorage)
{
	$rootScope.app_config	= AppConstants;
	$rootScope.state		= $state;

	$rootScope.$on('$stateChangeStart', function(event, next, current)
	{
		SessionService.validate_session()
		
		.then(function resolve(session)
		{
			$rootScope.current_user = $localStorage.current_user;
			
			if(next.name == 'login' || next.name == 'register')
			{
				event.preventDefault();
				return $state.go('me');
			}
			
			return next;
		},
		
		function reject(err)
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

	$rootScope.$on('$stateChangeSuccess', function(event, current, params, prev)
	{
		if($rootScope.current_user == null) $stickyState.reset('client');
	});
});