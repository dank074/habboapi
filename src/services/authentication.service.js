class AuthenticationService
{
	constructor(AppConstants, SessionService, $http, $q)
	{
		'ngInject';

		this._AppConstants 		= AppConstants;
		this._SessionService 	= SessionService;
		this._$http 			= $http;
		this._$q 				= $q;
	}

	login(user_name, user_pass)
	{
		if(user_name == '' || null || user_pass == '' || null) return this._$q.reject('invalid_parameters');

		return this._$http.post(this._AppConstants.api + '/service/authentication/login', {user_name: user_name, user_pass: user_pass})

		.then((res) =>
		{
			if(res.data.session == undefined || res.data.session.length == 0 || null) return this._$q.reject('invalid_session');

			return this._SessionService.create_session(res.data.session.user_id, res.data.session.user_name, res.data.session.user_session);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_login' : res.data.error);
		});
	}
}

export default AuthenticationService;