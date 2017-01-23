
	define(['app', 'config'], function(app, config)
	{
		function MenuBarDirective()
		{
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'app/views/menu-bar.directive.html',
				controller: MenuBarController
			};
        }

		function MenuBarController($http, $state, $scope, $localStorage)
		{
			$scope.state = $state;
			$scope.navigation_list = [];

			if(config.navigation_list == undefined || null) return;

			angular.forEach(config.navigation_list, function(list_item, key)
			{
				angular.forEach(config.states, function(state, key)
				{
					if(state.name != list_item.state) return;

					if(state.login_required == true && $localStorage.current_user == undefined || null) return;

					$scope.navigation_list.push(list_item);
				});
			});
		}

		MenuBarDirective.inject		= [];
		MenuBarController.inject	= ['$http', '$state', '$scope', '$localStorage'];

		app.directive('appMenuBar', MenuBarDirective);
	});