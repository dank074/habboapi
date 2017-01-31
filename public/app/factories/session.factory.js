
    define(['app'], function(app)
	{
		function SessionFactory($http, $q, $localStorage)
		{
			var SessionFactory = {};

			SessionFactory.create_session = function(user_id, user_name, user_session)
			{
				return $q(function(resolve, reject)
				{
					if(user_id == null || typeof user_id != 'number' || user_name == null || user_session == null) return reject('invalid_parameters');
                    
                    $localStorage.$reset();
                    
                    $localStorage.current_user = {
						login_status: true,
						user_id: user_id,
						user_name: user_name,
						user_session: user_session,
						user_info: null
                    };
                    
                    return resolve($localStorage.current_user);
				});
			};

			SessionFactory.validate_session = function()
			{
				return $q(function(resolve, reject)
				{
					if($localStorage.current_user == undefined || null) return reject('invalid_session');

					$http.get('service/session/get_session')

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
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			SessionFactory.destroy_session = function()
			{
				return $q(function(resolve, reject)
				{
					$http.get('service/session/destroy_session')

					.then(function(response)
					{
						$localStorage.$reset();
						return resolve(null);
					})

					.catch(function(err)
					{
						return reject((err.data == undefined || null) ? err.message : err.data.error);
					});
				});
			};

			return SessionFactory;
		}

		SessionFactory.$inject = ['$http', '$q', '$localStorage'];

		app.factory('SessionFactory', SessionFactory);
	});