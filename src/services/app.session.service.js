angular.module('app').service('SessionService', function(AppConstants, $localStorage, $http, $q)
{
	var SessionService = {};

	SessionService.create_session = function(user_id, user_name, user_session)
	{
		$localStorage.$reset();
		
		$localStorage.current_user = {
			login_status: true,
			user_id: user_id,
			user_name: user_name,
			user_session: user_session
        };

		return $q.resolve($localStorage.current_user);
	};

	SessionService.validate_session = function()
	{
		if($localStorage.current_user == null) return $q.reject('invalid_session');
		
		return $http.get(AppConstants.api + '/service/session/get_session')
		
		.then(function resolve(res)
		{
			if(res.data.session == undefined || null || res.data.session.user_info == undefined || null) return $q.reject('invalid_session');

			if(res.data.session.user_session != $localStorage.current_user.user_session) return $q.reject('invalid_session');

			angular.forEach(res.data.session.user_info.settings, function(value, key)
			{
				if(key == 'id' || key == 'user_id') return;

				res.data.session.user_info.settings[key] = (value == '0') ? false : true;
			});

			$localStorage.current_user.user_info = res.data.session.user_info;
			
			return $q.resolve($localStorage.current_user);
		},

		function reject(res)
		{
			$localStorage.$reset();

			return $q.reject((res.data.error == undefined || null) ? 'invalid_session' : res.data.error);
		});
	};

	SessionService.destroy_session = function()
	{
		return $http.get(AppConstants.api + '/service/session/destroy_session')
		
		.then(function resolve(res)
		{
			$localStorage.$reset();
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			$localStorage.$reset();
			return $q.resolve(null);
		});
	};

	return SessionService;
});