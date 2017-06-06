class ProfileRoomsController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#rooms-dialog',
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

let ProfileRoomsComponent = {
    bindings: {
        username: '=',
        rooms: '='
    },
    controller: ProfileRoomsController,
    templateUrl: 'views/profile.rooms.html'
};

export default ProfileRoomsComponent;