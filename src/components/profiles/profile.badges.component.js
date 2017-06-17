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
                contentElement: '#profileBadges-dialog',
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
        username: '=',
        data: '='
    },
    controller: ProfileBadgesController,
    templateUrl: 'views/components/profiles/profile.badges.html'
};

export default ProfileBadgesComponent;