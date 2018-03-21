import navigation from '../config/navigation.json';

class NavigationController
{
    constructor($state, $scope)
    {
        'ngInject';

        this.$state         = $state;
        this.$scope         = $scope;

        this.$onInit = () => this.buildNavigation();
    }

    buildNavigation()
    {
        this.$scope.navigationList = [];

        if(navigation.navigation == null || navigation.navigation.length == 0) return;

        angular.forEach(navigation.navigation, (item, key) =>
        {
            if(item.state == undefined || null && item.url == undefined || null) return;

            if(item.state != undefined || null)
            {
                let state = this.$state.get(item.state);

                if(state == null) return;

                item.state = state;

                if(item.subItems == undefined || null || item.subItems.length == 0) return this.$scope.navigationList.push(item);

                item.children = [];

                angular.forEach(item.subItems, (subItem, key) =>
                {
                    if(subItem.state == undefined || null && subItem.url == undefined || null) return;

                    if(subItem.state != undefined || null)
                    {
                        let state = this.$state.get(subItem.state);

                        if(state == null) return;
                        
                        subItem.state = state;
                    }

                    return item.children.push(subItem);
                });

                delete item.subItems;
            }

            return this.$scope.navigationList.push(item);
        });
    }
}

let NavigationComponent = {
    controller: NavigationController,
    templateUrl: 'views/navigation.html'
};

export default NavigationComponent;