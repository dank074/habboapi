
	define([], function()
	{
		return {
			defaultState: '/login',
			states: {
				'login': {
					name: 'login',
					url: '/login',
					templateUrl: 'app/views/login.html',
					controller: 'LoginController',
					login_required: false
				},

				'app': {
					abstract: true,
					name: 'app',
					url: '/app',
					templateUrl: 'app/views/main.html',
					controller: 'MainController',
					login_required: true
				},

				'app.not_found': {
					name: 'app.not_found',
					page_name: 'Not found',
					url: '/not_found',
					templateUrl: 'app/views/not_found.html',
					login_required: true
				},

				'app.dashboard': {
					name: 'app.dashboard',
					page_name: 'Dashboard',
					url: '/dashboard',
					templateUrl: 'app/views/dashboard.html',
					controller: 'DashboardController',
					login_required: true,
					page_permission: 'hk_page_dashboard'
				},

				'app.log_logins': {
					name: 'app.log_logins',
					page_name: 'Logins Log',
					url: '/log_logins',
					templateUrl: 'app/views/log_logins.html',
					login_required: true,
					page_permission: 'hk_page_log_logins'
				}
			}
		};
	});