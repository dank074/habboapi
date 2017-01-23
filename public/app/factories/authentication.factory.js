
    define(['app'], function(app)
	{
		function AuthenticationFactory($http, $q, $localStorage)
		{
			var AuthenticationFactory = {};

			AuthenticationFactory.login = function(data)
			{
				return $q(function(resolve, reject)
				{
					if(data.user_name == undefined || null || data.user_pass == undefined || null) return reject('invalid_parameters');
					
					$http.post('service/authentication/login', data)
					
					.then(function(response)
					{
						if(response.data.session == undefined || null) return reject('invalid_session');

						$localStorage.$reset();

						$localStorage.current_user = {
							login_status: true,
							user_id: response.data.session.user_id,
							user_name: response.data.session.user_name,
							user_session: response.data.session.user_session
						};

						return resolve($localStorage.current_user);
					})

					.catch(function(err)
					{
						return reject(err);
					});
				});
			};

			AuthenticationFactory.validate_session = function()
			{
				return $q(function(resolve, reject)
				{
					if($localStorage.current_user == undefined || null) return reject('invalid_session');

					$http.get('service/authentication/get_session')

					.then(function(response)
					{
						if(response.data.session == undefined || null || response.data.session.user_id != $localStorage.current_user.user_id || response.data.session.user_name != $localStorage.current_user.user_name || response.data.session.user_session != $localStorage.current_user.user_session)
						{
							$localStorage.$reset();
							return reject('invalid_session');
						}
						
						return resolve($localStorage.current_user);
					})

					.catch(function(err)
					{
						$localStorage.$reset();
						return reject(err);
					});
				});
			};

			AuthenticationFactory.logout = function()
			{
				return $q(function(resolve, reject)
				{
					$http.get('service/authentication/logout')

					.then(function(response)
					{
						$localStorage.$reset();
						return resolve(null);
					})

					.catch(function(err)
					{
						return reject(err);
					});
				});
			};

			return AuthenticationFactory;
		}

		AuthenticationFactory.$inject = ['$http', '$q', '$localStorage'];

		app.factory('AuthenticationFactory', AuthenticationFactory);
	});