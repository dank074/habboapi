import navigation from '../config/navigation.json';

class NavigationDirective
{
    constructor()
    {
        this.restrict       = 'E';
        this.replace        = true;
        this.templateUrl    = 'views/navigation.html';
    }

    controller($state, $rootScope, $scope)
    {
        'ngInject';

		$scope.navigation_list = [];
        
        if(navigation.navigation == null || navigation.navigation.length == 0) return;

        angular.forEach(navigation.navigation, (item, key) =>
		{
            if(item.disabled == true) return;
            
			angular.forEach($state.get(), (state, key) =>
			{
				if(state.name != item.state) return;

				if(state.login_required == true && $rootScope.current_user == undefined || null) return;
                
                $scope.navigation_list.push(item);
			});
		});
    }
}

export default NavigationDirective;