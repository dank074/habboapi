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
                contentElement: '#profileRooms-dialog',
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
        data: '='
    },
    controller: ProfileRoomsController,
    templateUrl: 'views/components/profiles/profile.rooms.html'
};

export default ProfileRoomsComponent;