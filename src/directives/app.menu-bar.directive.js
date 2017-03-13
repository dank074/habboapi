var navigation = require('../config/app.navigation.json').navigation;

angular.module('app').directive('appMenuBar', function()
{
    return {
		restrict: 'E',
		replace: true,
		templateUrl: 'menu-bar.directive.html',
		controller: MenuBarController
	}

    function MenuBarController($http, $state, $localStorage, $scope)
	{
        'ngInject';

		$scope.navigation_list = [];
        
        if(navigation == null || navigation.length == 0) return;

        angular.forEach(navigation, function(item, key)
		{
			angular.forEach($state.get(), function(state, key)
			{
				if(state.name != item.state) return;

				if(state.login_required == true && $localStorage.current_user == undefined || null) return;
                
                $scope.navigation_list.push(item);
			});
		});
    }
});