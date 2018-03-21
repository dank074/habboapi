export default class HabboAPI
{
    constructor(AppConstants, $localStorage, $state, $stickyState, $http, $rootScope, $q)
    {
        'ngInject';
        
        this.AppConstants   = AppConstants;
        this.$localStorage  = $localStorage;
        this.$state         = $state;
        this.$stickyState   = $stickyState;
        this.$http          = $http;
        this.$rootScope     = $rootScope;
        this.$q             = $q;
    }

    send(type, url, data)
    {
        return this.$http({method: type, url: this.AppConstants.api + url, data: data})

        .then((res) =>
        {
            if(res.data == undefined || null) this.$q.reject(res);

            if(res.data.session == undefined || null || res.data.session.habbo == undefined || null)
            {
                if(this.$rootScope.clientLoaded == true) this.$stickyState.reset('client');

                this.$localStorage.currentUser  = undefined;
                this.$rootScope.currentUser     = undefined;

                if(this.$state.current.loginRequired == true) return this.$q.reject(this.$state.go('login'));

                return this.$q.resolve(res);
            }

            angular.forEach(res.data.session.habbo.settings, (value, key) =>
            {
                if(key == 'id' || key == 'user_id') return;
                
                res.data.session.habbo.settings[key] = (value == '0') ? false : true;
            });

            this.$localStorage.currentUser  = res.data.session;
            this.$rootScope.currentUser     = res.data.session;
            
            return this.$q.resolve(res);
        },
        
        (res) =>
        {
            if(res.data == undefined || null) this.$q.reject(res);

            if(res.data.session == undefined || null || res.data.session.habbo == undefined || null)
            {
                if(this.$rootScope.clientLoaded == true) this.$stickyState.reset('client');

                this.$localStorage.currentUser  = undefined;
                this.$rootScope.currentUser     = undefined;

                if(res.status == '403') return location.replace('/banned');
                if(res.status == '423' && res.data.ban != undefined || null) return this.$q.reject(this.$state.go('banned', {reason: res.data.ban.ban_reason, expires: res.data.ban.ban_expire}));
                if(res.status == '503') return location.replace('/maintenance');

                if(this.$state.current.loginRequired == true) return this.$q.reject(this.$state.go('login'));

                return this.$q.reject(res);
            }

            angular.forEach(res.data.session.habbo.settings, (value, key) =>
            {
                if(key == 'id' || key == 'user_id') return;
                
                res.data.session.habbo.settings[key] = (value == '0') ? false : true;
            });

            this.$localStorage.currentUser  = res.data.session;
            this.$rootScope.currentUser     = res.data.session;

            return this.$q.reject(res);
        });
    }
}