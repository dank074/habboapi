class UserListController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#' + this._$scope.$ctrl.type + '-dialog',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        this._$scope.hide = () =>
        {
            $mdDialog.hide();
        };
    }
}

let UserListComponent = {
    bindings: {
        header: '=',
        type: '@',
        data: '='
    },
    controller: UserListController,
    templateUrl: 'views/components/users/user.list.html'
};

export default UserListComponent;