function Run(AppConstants, SessionService, StatisticsService, $localStorage, $state, $stickyState, $interval, $rootScope, $document)
{
    'ngInject';
    
    $rootScope.app_config   = AppConstants;
    $rootScope.state		= $state;

    $rootScope.get_online_count = () =>
    {
        StatisticsService.users_online()

        .then((count) =>
        {
            $rootScope.users_online = count;
        });
    };

    $rootScope.get_online_count();

    $interval(() => { $rootScope.get_online_count(); }, 60000);

    $rootScope.$on('$stateChangeStart', (event, next, current) =>
    {
        return SessionService.validate_session()
        
        .then((session) =>
        {
            if(next.name == 'login')
            {
                event.preventDefault();
                return $state.go('me');
            }

            if(next.permission && $localStorage.current_user.user_permissions[next.permission] == 0)
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

    $rootScope.$on('$stateChangeSuccess', (event, to, toParams, prev, prevParams) =>
    {
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        $rootScope.previous_state 	= (prev.name == undefined || prev.name == '' || null) ? $state.get('login') : prev;
        $rootScope.previous_params 	= prevParams;
        $rootScope.current_state 	= to;

        $rootScope.go_back = () =>
        {
            return $state.go($rootScope.previous_state.name, $rootScope.previous_params);
        };
    });
}

export default Run;