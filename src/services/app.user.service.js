angular.module('app').service('UserService', function(AppConstants, $http, $q)
{
	var UserService = {};

	UserService.validate_username = function(user_name)
	{
		if(user_name == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/validate_username', {user_name: user_name})
		
		.then(function resolve(res)
        {
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_username' : res.data.error);
		});
	};

	UserService.validate_email = function(email_address)
	{
		if(email_address == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/validate_email', {email_address: email_address})
		
		.then(function resolve(res)
        {
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_email' : res.data.error);
		});
	};

	UserService.update_user = function(data)
	{
		if(data == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/update_user', {data: data})
		
		.then(function resolve(res)
		{
			if(res.data.user == undefined || null) return $q.reject('invalid_user');
			
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	};

	UserService.update_settings = function(data)
	{
		if(data == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/update_settings', {data: data})
		
		.then(function resolve(res)
		{
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	};

	UserService.update_password = function(new_password, password)
	{
		if(new_password == '' || null || password == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/update_password', {new_password: new_password, password: password})
		
		.then(function resolve(res)
		{
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	};

	UserService.update_email = function(new_email, password)
	{
		if(new_email == '' || null || password == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/update_email', {new_email: new_email, password: password})
		
		.then(function resolve(res)
		{
			return $q.resolve(null);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	};

	UserService.add_user = function(user_name, user_email, user_pass)
	{
		if(user_name == '' || null || user_email == '' || null || user_pass == '' || null) return $q.reject('invalid_parameters');

		return $http.post(AppConstants.api + '/service/user/add_user', {user_name: user_name, user_email: user_email, user_pass: user_pass})
		
		.then(function resolve(res)
		{
			if(res.data.user == undefined || null) return $q.reject('invalid_user');
			
			return $q.resolve(res.data.user);
		},
		
		function reject(res)
		{
			return $q.reject((res.data.error == undefined || null) ? 'invalid_user' : res.data.error);
		});
	};

	return UserService;
});