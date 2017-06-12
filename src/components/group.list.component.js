class GroupListController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#grouplist-dialog',
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

let GroupListComponent = {
    bindings: {
        header: '=',
        grouplist: '='
    },
    controller: GroupListController,
    templateUrl: 'views/components/group.list.html'
};

export default GroupListComponent;