class ProfileGroupsController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#profileGroups-dialog',
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

let ProfileGroupsComponent = {
    bindings: {
        username: '=',
        data: '='
    },
    controller: ProfileGroupsController,
    templateUrl: 'views/components/profiles/profile.groups.html'
};

export default ProfileGroupsComponent;