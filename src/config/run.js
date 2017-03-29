function Run(AppConstants, SessionService, $localStorage, $stickyState, $state, $rootScope)
{
	'ngInject';
	
	$rootScope.app_config		= AppConstants;
	$rootScope.state			= $state;

	$rootScope.$on('$stateChangeStart', (event, next, current) =>
	{
		return SessionService.validate_session()
		
		.then((session) =>
		{
			$rootScope.current_user = $localStorage.current_user;
			
			if(next.name == 'login' || next.name == 'register')
			{
				event.preventDefault();
				return $state.go('me');
			}
			
			return next;
		})

		.catch((err) =>
		{
			event.preventDefault();

			$rootScope.current_user = null;
			
			if(next.login_required == true)
			{
				return $state.go('login');
			}

			return next;
		});
	});

	$rootScope.$on('$stateChangeSuccess', (event, to, toParams, prev, prevParams) =>
	{
		if($rootScope.current_user == null) $stickyState.reset('client');

		$rootScope.previous_state 	= (prev.name == undefined || prev.name == '' || null) ? $state.get('login') : prev;
		$rootScope.previous_params 	= prevParams;
	});
}

export default Run;