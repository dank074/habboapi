class GroupMembersController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#members-dialog',
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

let GroupMembersComponent = {
    bindings: {
        members: '='
    },
    controller: GroupMembersController,
    templateUrl: 'views/group.members.html'
};

export default GroupMembersComponent;