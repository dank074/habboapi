import angular from 'angular';

class SessionService
{
    constructor(AppConstants, $localStorage, $http, $q)
    {
        'ngInject';

        this._AppConstants	= AppConstants;
        this._$localStorage = $localStorage;
        this._$http			= $http;
        this._$q			= $q;
    }

    create_session(user_id, user_name, user_session)
    {
        if(user_id == '' || user_id == '0' || null || user_name == '' || null || user_session == '' || null) return this._$q.reject('invalid_parameters');

        this._$localStorage.$reset();

        this._$localStorage.current_user = {
            login_status: true,
            user_id: user_id,
            user_name: user_name,
            user_session: user_session
        };

        return this._$q.resolve(this._$localStorage.current_user);
    }

    validate_session()
    {
        if(this._$localStorage.current_user == undefined || this._$localStorage.current_user.length == 0 || null) return this._$q.reject('invalid_session');

        return this._$http.get(this._AppConstants.api + '/service/session/get_session')

        .then((res) =>
        {
            if(res.data.session == undefined || res.data.session.length == 0 || null || res.data.session.user_info == undefined || res.data.session.user_info.length == 0 || null) return this._$q.reject('invalid_session');

            if(res.data.session.user_session != this._$localStorage.current_user.user_session) return this._$q.reject('invalid_session');

            angular.forEach(res.data.session.user_info.settings, (value, key) =>
            {
                if(key == 'id' || key == 'user_id') return;

                res.data.session.user_info.settings[key] = (value == '0') ? false : true;
            });

            this._$localStorage.current_user.user_info = res.data.session.user_info;

            return this._$q.resolve(this._$localStorage.current_user);
        })

        .catch((res) =>
        {
            this._$localStorage.$reset();

            return this._$q.reject(res);
        });
    }

    destroy_session()
    {
        return this._$http.get(this._AppConstants.api + '/service/session/destroy_session')

        .then((res) =>
        {
            this._$localStorage.$reset();
            return this._$q.resolve(null);
        })

        .catch((res) =>
        {
            this._$localStorage.$reset();
            return this._$q.resolve(null);
        });
    }
}

export default SessionService;