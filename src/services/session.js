export default class Session
{
    constructor(HabboAPI, $localStorage, $q)
    {
        'ngInject';

        this.HabboAPI       = HabboAPI;
        this.$localStorage  = $localStorage;
        this.$q 			= $q;
    }

    getSession()
    {
        if(this.$localStorage.currentUser == undefined || null) return;

        return this.$localStorage.currentUser;
    }

    isAuthenticated()
    {
        return new Promise((resolve, reject) =>
        {
            let session = this.getSession();

            if(session == null) return reject(null);
            
            return resolve(null);
        });
    }

    isFriend(id)
    {
        if(id == 0 || null) return false;
        
        let session = this.getSession();

        if(session == null) return false;

        if(session.habbo == undefined || null) return false;

        if(session.habbo.friends == undefined || null) return false;
        
        if(session.habbo.friends.find(friend => friend.id === id) == undefined || null) return false;

        return true;
    }

    ping()
    {
        return this.HabboAPI.send('GET', '/authentication/session/get', null)

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((err) =>
        {
            return this.$q.reject(err);
        });
    }
}