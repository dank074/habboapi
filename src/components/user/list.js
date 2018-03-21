class UserListController
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

let UserListComponent = {
    bindings: {
        identifier: '@',
        header: '@',
        type: '@',
        limit: '@',
        users: '='
    },
    controller: UserListController,
    templateUrl: 'views/user/list.html'
};

export default UserListComponent;