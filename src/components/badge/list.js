class BadgeListController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this.$mdDialog  = $mdDialog;
        this.$scope     = $scope;

        this.$scope.showAll = (event) => this.showAll(event);
        this.$scope.hide    = () => this.$mdDialog.hide();
    }

    showAll(event)
    {
        this.$mdDialog.show({
            contentElement: '#' + this.$scope.$ctrl.identifier + '-dialog',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    }
}

let BadgeListComponent = {
    bindings: {
        identifier: '@',
        header: '@',
        type: '@',
        limit: '@',
        badges: '='
    },
    controller: BadgeListController,
    templateUrl: 'views/badge/list.html'
};

export default BadgeListComponent;