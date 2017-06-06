class SessionService
{
    constructor(AppConstants, $localStorage, $http, $q, $stickyState, $rootScope)
    {
        'ngInject';

        this._AppConstants	= AppConstants;
        this._$localStorage = $localStorage;
        this._$http			= $http;
        this._$q			= $q;
        this._$stickyState  = $stickyState;
        this._$rootScope    = $rootScope;
    }

    create_session()
    {
        return this._$http.get(this._AppConstants.api + '/authentication/session/get_session')

        .then((res) =>
        {
            this._$localStorage.$reset();

            if(res.data.session == undefined || res.data.session.length == 0 || null) return this._$q.reject('invalid_session');
            
            this._$localStorage.current_user = res.data.session;

            return this._$q.resolve(this._$localStorage.current_user);
        })

        .catch((res) =>
        {
            this._$localStorage.$reset();

            return this._$q.reject(res);
        });
    }

    validate_session()
    {
        if(this._$localStorage.current_user == undefined || this._$localStorage.current_user.length == 0 || null) return this._$q.reject('invalid_session');

        return this._$http.get(this._AppConstants.api + '/authentication/session/get_session')

        .then((res) =>
        {
            if(res.data.session == undefined || res.data.session.length == 0 || null) return this._$q.reject('invalid_session');
            
            if(res.data.session.user_session != this._$localStorage.current_user.user_session) return this._$q.reject('invalid_session');

            angular.forEach(res.data.session.user_info.settings, (value, key) =>
            {
                if(key == 'id' || key == 'user_id') return;

                res.data.session.user_info.settings[key] = (value == '0') ? false : true;
            });

            this._$localStorage.current_user = res.data.session;

            return this._$q.resolve(this._$localStorage.current_user);
        })

        .catch((res) =>
        {
            this._$stickyState.reset('client');

            this._$localStorage.$reset();

            return this._$q.reject(res);
        });
    }

    destroy_session()
    {
        return this._$http.get(this._AppConstants.api + '/authentication/session/destroy_session')

        .then((res) =>
        {
            this._$stickyState.reset('client');

            this._$localStorage.$reset();

            return this._$q.resolve(null);
        })

        .catch((res) =>
        {
            this._$stickyState.reset('client');

            this._$localStorage.$reset();
            
            return this._$q.resolve(null);
        });
    }
}

export default SessionService;