
    define(['app'], function(app)
	{
		function Authenticator($http, $q, $localStorage, Permission)
		{
			var Authenticator = {};

			Authenticator.login = function(data)
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
							user_rank: response.data.session.user_rank,
							user_session: response.data.session.user_session
						};

						return Permission.load_permissions();
					})

					.then(function()
					{
						return resolve($localStorage.current_user);
					})

					.catch(function(err)
					{
						return reject(err);
					});
				});
			};

			Authenticator.validate_session = function()
			{
				return $q(function(resolve, reject)
				{
					$http.get('service/authentication/get_session')

					.then(function(response)
					{
						if(response.data.session == undefined || null || response.data.session.user_id != $localStorage.current_user.user_id || response.data.session.user_name != $localStorage.current_user.user_name || response.data.session.user_rank != $localStorage.current_user.user_rank || response.data.session.user_session != $localStorage.current_user.user_session)
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

			Authenticator.logout = function()
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

			return Authenticator;
		}

		Authenticator.$inject = ['$http', '$q', '$localStorage', 'Permission'];

		app.factory('Authenticator', Authenticator);
	});