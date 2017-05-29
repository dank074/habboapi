class ProfileBadgesController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#badge-dialog',
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

let ProfileBadgesComponent = {
    bindings: {
        badges: '='
    },
    controller: ProfileBadgesController,
    templateUrl: 'views/profile.badges.html'
};

export default ProfileBadgesComponent;