class RoomListController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#roomlist-dialog',
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

let RoomListComponent = {
    bindings: {
        header: '=',
        roomlist: '='
    },
    controller: RoomListController,
    templateUrl: 'views/components/room.list.html'
};

export default RoomListComponent;