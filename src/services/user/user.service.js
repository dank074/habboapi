class UserService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	validate_username(user_name)
	{
		if(user_name == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/validate_username', {user_name: user_name})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_username' : res.data.error);
		});
	}

	validate_email(email_address)
	{
		if(email_address == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/validate_email', {email_address: email_address})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_email' : res.data.error);
		});
	}

	add_user(user_name, user_email, user_pass)
	{
		if(user_name == '' || null || user_email == '' || null || user_pass == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/add_user', {user_name: user_name, user_email: user_email, user_pass: user_pass})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_password(new_password, password)
	{
		if(new_password == '' || null || password == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/update_password', {new_password: new_password, password: password})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_email(new_email, password)
	{
		if(new_email == '' || null || password == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/update_email', {new_email: new_email, password: password})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_settings(data)
	{
		if(data == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/services/user/user/update_settings', {data: data})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}
}

export default UserService;