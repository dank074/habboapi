export default class Authentication
{
    constructor(HabboAPI, $localStorage, $rootScope, $q)
    {
        'ngInject';

        this.HabboAPI       = HabboAPI;
        this.$localStorage  = $localStorage;
        this.$rootScope     = $rootScope;
        this.$q 			= $q;
    }

    login(username, password)
    {
        if(username == null || password == null) return this.$q.reject('invalid_parameters');

        if(this.$localStorage.currentUser != undefined || null) return this.$q.reject('valid_session');
            
        return this.HabboAPI.send('POST', '/authentication/login', {username: username, password: password})

        .then((res) =>
        {
            if(res.data.session == undefined || null) return this.$q.reject('invalid_session');

            this.$localStorage.currentUser  = res.data.session;
            this.$rootScope.currentUser     = res.data.session;

            return this.$q.resolve(res.data.session);
        })
        
        .catch((err) =>
        {
            return this.$q.reject(err.data.error);
        });
    }

    logout()
    {
        return this.HabboAPI.send('GET', '/authentication/session/logout', null)

        .then((res) =>
        {
            this.$localStorage.currentUser  = null;
            this.$rootScope.currentUser     = null;

            return this.$q.resolve(null);
        })
        
        .catch((err) =>
        {
            this.$localStorage.currentUser  = null;
            this.$rootScope.currentUser     = null;

            return this.$q.resolve(null);
        });
    }
}