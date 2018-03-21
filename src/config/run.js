export default function Run(AppConstants, Session, HotelCommunity, $state, $stickyState, $interval, $rootScope)
{
    'ngInject';

    $rootScope.appConfig    = AppConstants;
    $rootScope.Session      = Session
    $rootScope.state		= $state;

    HotelCommunity.loadUsersOnline();

    $interval(() => { HotelCommunity.loadUsersOnline(); }, 60000);

    $rootScope.$on('$stateChangeStart', (event, next, current) =>
    {
        return Session.isAuthenticated()

        .then(() =>
        {
            $rootScope.currentUser = Session.getSession();

            if(next.guestOnly == true)
            {
                event.preventDefault();
                return $state.go('home.me');
            }

            return next;
        })

        .catch(() =>
        {
            $rootScope.currentUser = null;

            if(next.loginRequired == true)
            {
                event.preventDefault();
                return $state.go('login');
            }

            return next;
        });
    });

    $rootScope.$on('$stateChangeSuccess', (event, to, toParams, prev, prevParams) =>
    {
        $rootScope.previousState 	= (prev.name == undefined || null || prev.name == '') ? $state.get('login') : prev;
        $rootScope.previousParams 	= prevParams;
        $rootScope.currentState 	= to;

        $rootScope.goBack = () =>
        {
            return $state.go($rootScope.previousState.name, $rootScope.previousParams);
        };

        if($rootScope.currentUser == undefined || null) $stickyState.reset('client');

        $rootScope.clientLoaded = (typeof($stickyState.getInactiveStates()[0]) != 'undefined' && $stickyState.getInactiveStates()[0].includes.client == true && $rootScope.currentUser.habbo.online == 1) ? true : false;
    });
}