angular.module('app').service('AuthenticationService', function(AppConstants, SessionService, $http, $q)
{
	var AuthenticationService = {};

	AuthenticationService.login = function(user_name, user_pass)
	{
		return $http.post(AppConstants.api + '/service/authentication/login', {user_name: user_name, user_pass: user_pass})

		.then(function resolve(res)
		{
			if(res.data.session == undefined || null) return $q.reject('invalid_session');

			return SessionService.create_session(res.data.session.user_id, res.data.session.user_name, res.data.session.user_session);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_login' : res.data.error);
		});
	};

	return AuthenticationService;
});