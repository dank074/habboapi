class ProfileFriendsController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#friends-dialog',
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

let ProfileFriendsComponent = {
    bindings: {
        username: '=',
        friends: '='
    },
    controller: ProfileFriendsController,
    templateUrl: 'views/profile.friends.html'
};

export default ProfileFriendsComponent;