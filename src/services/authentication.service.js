class Authentication
{
	constructor(AppConstants, Session, $http, $q)
	{
		'ngInject';

		this._AppConstants = AppConstants;
		this._Session = Session;
		this._$http = $http;
		this._$q = $q;
	}

	login(user_name, user_pass)
	{
		return this._$http.post(this._AppConstants.api + '/service/authentication/login', {
			user_name: user_name,
			user_pass: user_pass
		})

		.then((res) =>
		{
			if(res.data.session == undefined || null) return this._$q.reject('invalid_session');

			return this._Session.create_session(res.data.session.user_id, res.data.session.user_name, res.data.session.user_session);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_login' : res.data.error);
		});
	}
}

export default Authentication;