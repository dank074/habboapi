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
                contentElement: '#userlist-dialog',
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
        userlist: '='
    },
    controller: UserListController,
    templateUrl: 'views/components/user.list.html'
};

export default UserListComponent;