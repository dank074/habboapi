function Run(AppConstants, Session, User, $localStorage, $stickyState, $state, $rootScope)
{
	'ngInject';
	
	$rootScope.app_config	= AppConstants;
	$rootScope.state		= $state;

	$rootScope.$on('$stateChangeStart', (event, next, current) =>
	{
		return Session.validate_session()
		
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
			$rootScope.current_user = null;
			
			if(next.login_required == true)
			{
				event.preventDefault();
				return $state.go('login');
			}

			return next;
		});
	});

	$rootScope.$on('$stateChangeSuccess', (event, current, params, prev) =>
	{
		if($rootScope.current_user == null) $stickyState.reset('client');
	});
}

export default Run;