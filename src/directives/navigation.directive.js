import navigation from '../config/navigation.json';

class NavigationDirective
{
    constructor()
    {
        this.restrict       = 'E';
        this.replace        = true;
        this.templateUrl    = 'views/navigation.html';
    }

    controller($state, $scope)
    {
        'ngInject';

        $scope.main_navigation = [];

        if(navigation.navigation == null || navigation.navigation.length == 0) return;

        angular.forEach(navigation.navigation, (item, key) =>
        {
            if(item.disabled == true) return;

            angular.forEach($state.get(), (state, key) =>
            {
                if(state.name != item.state) return;
                
                item.state = state;
                
                $scope.main_navigation.push(item);
            });
        });
    }
}

export default NavigationDirective;