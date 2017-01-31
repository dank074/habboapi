
    define(['app'], function(app)
	{
		function AuthenticationFactory($http, $q, SessionFactory)
		{
			var AuthenticationFactory = {};

			AuthenticationFactory.login = function(user_name, user_pass)
			{
				return $q(function(resolve, reject)
				{
					if(user_name == null || user_pass == null) return reject('invalid_parameters');
					
					$http.post('service/authentication/login', {user_name: user_name, user_pass: user_pass})
					
					.then(function(response)
					{
						if(response.data.session == undefined || null) return reject('invalid_session');

						var user_id 		= (response.data.session.user_id == undefined || null || typeof response.data.session.user_id != 'number') ? null : response.data.session.user_id,
							user_name		= (response.data.session.user_name == undefined || null) ? null : response.data.session.user_name,
							user_session	= (response.data.session.user_session == undefined || null) ? null : response.data.session.user_session;

						if(user_id == null || user_name == null || user_session == null) return reject('invalid_session');

						return SessionFactory.create_session(user_id, user_name, user_session);
					})

					.then(function(session)
					{
						if(session == null) return reject('invalid_session');

						return resolve(session);
					})

					.catch(function(err)
					{
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			return AuthenticationFactory;
		}

		AuthenticationFactory.$inject = ['$http', '$q', 'SessionFactory'];

		app.factory('AuthenticationFactory', AuthenticationFactory);
	});