
    define(['app'], function(app)
	{
		function UserFactory($http, $q)
		{
			var UserFactory = {};

			UserFactory.user_info = function(user_id)
			{
				return $q(function(resolve, reject)
				{
					if(user_id == null || user_id == 0 || typeof user_id != 'number') return reject('invalid_parameters');

					$http.post('controller/user/user_info', {user_id: user_id})
					
					.then(function(response)
					{
						if(response.data.user_info == undefined || null) return reject('invalid_user');

						return resolve(response.data.user_info);
					})

					.catch(function(err)
					{
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			UserFactory.validate_username = function(user_name)
			{
				return $q(function(resolve, reject)
				{
					var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{1,20}$/g;

					if(user_name == null) return reject('invalid_parameters');

					if(regex.test(user_name) == false) return reject('invalid_format');

					$http.post('controller/user/validate_username', {user_name: user_name})
					
					.then(function(response)
					{
						return resolve(null);
					})
					
					.catch(function(err)
                    {
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			UserFactory.validate_email = function(email_address)
			{
				return $q(function(resolve, reject)
				{
					var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;

					if(email_address == null) return reject('invalid_parameters');

					if(regex.test(email_address) == false) return reject('invalid_format');

					$http.post('controller/user/validate_email', {email_address: email_address})
					
					.then(function(response)
					{
						return resolve(null);
					})
					
					.catch(function(err)
                    {
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			UserFactory.add_user = function(user_name, user_email, user_pass)
			{
				return $q(function(resolve, reject)
				{
					if(user_name == null || user_email == null || user_pass == null) return reject('invalid_parameters');

					$http.post('controller/register/register', {user_name: user_name, user_email: user_email, user_pass: user_pass})
					
					.then(function(response)
					{
						return resolve(null);
					})

					.catch(function(err)
					{
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			return UserFactory;
		}

		UserFactory.$inject = ['$http', '$q'];

		app.factory('UserFactory', UserFactory);
	});