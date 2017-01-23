
	define([], function()
	{
		return {
			config: {
				"site_name": "HabFuse",
				"site_link": "http://10.0.0.3:3000"
			},

			navigation_list: [
				{
					name: 'Me',
					state: 'me',
					sort: 1,
					disabled: false
				},
				
				{
					name: 'Community',
					state: 'community',
					sort: 2,
					disabled: false
				},

				{
					name: 'News',
					state: 'news',
					sort: 3,
					disabled: false
				},

				{
					name: 'Staff',
					state: 'staff',
					sort: 4,
					disabled: false
				},

				{
					name: 'Settings',
					state: 'settings',
					sort: 5,
					disabled: false
				}
			],

			states: [
				{
					name: 'login',
					url: '/login',
					templateUrl: 'app/views/login.html',
					controller: 'LoginController'
				},

				{
					name: 'register',
					url: '/register',
					templateUrl: 'app/views/register.html',
					controller: 'RegisterController'
				},

				{
					name: 'not_found',
					url: '/not_found',
					templateUrl: 'app/views/not_found.html'
				},

				{
					name: 'me',
					url: '/me',
					templateUrl: 'app/views/me.html',
					controller: 'MeController',
					login_required: true
				},

				{
					name: 'settings',
					url: '/settings',
					templateUrl: 'app/views/settings.html',
					login_required: false
				}
			]
		};
	});