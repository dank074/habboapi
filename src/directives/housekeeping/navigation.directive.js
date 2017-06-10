import navigation from '../../config/navigation.json';

class HKNavigationDirective
{
    constructor()
    {
        this.restrict       = 'E';
        this.replace        = true;
        this.templateUrl    = 'views/housekeeping/navigation.html';
    }

    controller($state, $scope)
    {
        'ngInject';

        $scope.housekeeping_navigation = [];

        if(navigation.housekeeping == null || navigation.housekeeping.length == 0) return;

        angular.forEach(navigation.housekeeping, (item, key) =>
        {
            if(item.disabled == true || item.sub_items == undefined || item.sub_items.length == 0) return;

            item.children = [];

            angular.forEach(item.sub_items, (sub_item, key) =>
            {
                angular.forEach($state.get(), (state, key) =>
                {
                    if(state.name != sub_item.state) return;

                    sub_item.state = state;

                    item.children.push(sub_item);
                });
            });
            
            delete item.sub_items;
            
            if(item.children.length == 0) return;

            $scope.housekeeping_navigation.push(item);
        });
    }
}

export default HKNavigationDirective;