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
                contentElement: '#profileFriends-dialog',
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
        data: '='
    },
    controller: ProfileFriendsController,
    templateUrl: 'views/components/profiles/profile.friends.html'
};

export default ProfileFriendsComponent;