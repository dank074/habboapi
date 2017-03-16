import angular from 'angular';

class User
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$q = $q;
	}

	validate_username(user_name)
	{
		if(user_name == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/validate_username', {
			user_name: user_name
		})

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

		return this._$http.post(this._AppConstants.api + '/service/user/validate_email', {
			email_address: email_address
		})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_email' : res.data.error);
		});
	}

	update_user(data)
	{
		if(data == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/update_user', {
			data: data
		})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_user_settings(data)
	{
		if(data == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/update_user_settings', {
			data: data
		})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_user_password(new_password, password)
	{
		if(new_password == '' || null || password == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/update_user_password', {
			new_password: new_password,
			password: password
		})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	update_user_email(new_email, password)
	{
		if(new_email == '' || null || password == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/update_user_email', {
			new_email: new_email,
			password: password
		})

		.then((res) =>
		{
			return this._$q.resolve(null);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}

	add_user(user_name, user_email, user_pass)
	{
		if(user_name == '' || null || user_email == '' || null || user_pass == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/user/add_user', {
			user_name: user_name,
			user_email: user_email,
			user_pass: user_pass
		})

		.then((res) =>
		{
			if(res.data.user == undefined || null) return this._$q.reject('invalid_user');

			return this._$q.resolve(res.data.user);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	}
}

export default User;