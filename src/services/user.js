export default class HotelUser
{
    constructor(HabboAPI, $localStorage, $q)
	{
		'ngInject';

        this.HabboAPI       = HabboAPI;
        this.$localStorage  = $localStorage;
		this.$q 		    = $q;
	}

    updateHotelUser()
    {
        if(this.$localStorage.currentUser == undefined || null) return this.$q.reject('invalid_user');

        if(this.$localStorage.currentUser.habbo == undefined || null) return this.$q.reject('invalid_user');

        return this.HabboAPI.send('POST', '/user/update/user', {data: this.$localStorage.currentUser.habbo})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    updateHotelUserPassword(password, passwordNew)
    {
        if(password == null || passwordNew == null) return this.$q.reject('invalid_parameters');

        if(this.$localStorage.currentUser == undefined || null) return this.$q.reject('invalid_user');

        return this.HabboAPI.send('POST', '/user/update/password', {password: password, passwordNew: passwordNew})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    updateHotelUserEmail(password, email)
    {
        if(password == null || email == null) return this.$q.reject('invalid_parameters');

        if(this.$localStorage.currentUser == undefined || null) return this.$q.reject('invalid_user');

        return this.HabboAPI.send('POST', '/user/update/email', {password: password, email: email})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    updateHotelUserSettings()
    {
        if(this.$localStorage.currentUser == undefined || null) return this.$q.reject('invalid_user');

        if(this.$localStorage.currentUser.habbo == undefined || null) return this.$q.reject('invalid_user');

        if(this.$localStorage.currentUser.habbo.settings == undefined || null) return this.$q.reject('invalid_user');

        return this.HabboAPI.send('POST', '/user/update/settings', {data: this.$localStorage.currentUser.habbo.settings})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    addUser(username, email, password, reCAPTCHA)
    {
        if(username == null || email == null || password == null || reCAPTCHA == null) return this.$q.reject('invalid_parameters');

        if(this.$localStorage.currentUser != undefined || null) return this.$q.reject('valid_session');

        return this.HabboAPI.send('POST', '/user/add', {username: username, password: password, email: email, reCAPTCHA: reCAPTCHA})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    validateUsername(username)
    {
        if(username == '' || null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/user/validators/username', {username: username})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    validateEmail(email)
    {
        if(email == '' || null) return this.$q.reject('invalid_parameters');

        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(email) == false) return this.$q.reject('invalid_email');

        return this.HabboAPI.send('POST', '/user/validators/email', {email: email})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }
}