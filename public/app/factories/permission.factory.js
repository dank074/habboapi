
    define(['app'], function(app)
	{
		function Permission($http, $q, $localStorage)
		{
			var Permission = {};

			Permission.load_permissions = function()
			{
				return $q(function(resolve, reject)
				{
					$http.get('service/permission/permission_list')

					.then(function(response)
					{
						if(response.data.permissions == undefined || null) return reject('invalid_permissions');

						$localStorage.permission_list = response.data.permissions;

						return resolve($localStorage.permission_list);
					})

					.catch(function(err)
					{
						return reject(err);
					});
				});
			};

            Permission.has_permission = function(permission)
            {
				if(permission == null || $localStorage.permission_list == undefined || $localStorage.permission_list == null) return false;
				
				if($localStorage.permission_list[permission] == undefined || $localStorage.permission_list[permission] == 0) return false;

				return true;
            };

			return Permission;
		}

		Permission.$inject = ['$http', '$q', '$localStorage'];

		app.factory('Permission', Permission);
	});