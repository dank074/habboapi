import angular from 'angular';
import navigation from '../config/navigation.json';

class MenuBar
{
    constructor()
    {
        this.restrict		= 'E';
        this.replace		= true;
		this.templateUrl	= 'menu-bar.directive.html';
    }

    controller($localStorage, $http, $state, $scope)
    {
        'ngInject';

		$scope.navigation_list = [];
        
        if(navigation.navigation == null || navigation.navigation.length == 0) return;

        angular.forEach(navigation.navigation, (item, key) =>
		{
			angular.forEach($state.get(), (state, key) =>
			{
				if(state.name != item.state) return;

				if(state.login_required == true && $localStorage.current_user == undefined || null) return;
                
                $scope.navigation_list.push(item);
			});
		});
    }
}

export default MenuBar;