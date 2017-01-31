
	define(['app'], function(app)
	{
		function MainController($scope, $state, $mdSidenav, $localStorage)
		{
			$scope.site_name	= 'HabboAPI';
			$scope.state		= $state;
			$scope.current_user = $localStorage.current_user;

			$scope.toggle_navigation = function()
			{
				$mdSidenav('left').toggle();
			};
		}

		MainController.inject = ['$scope', '$state', '$mdSidenav', '$localStorage'];
		
		app.controller('MainController', MainController);
	});