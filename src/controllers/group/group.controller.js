class GroupController
{
    constructor(AppConstants, GroupService, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._GroupService  = GroupService;
        this._$stateParams  = $stateParams;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$scope.group_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;

        this.group_info(this._$scope.group_id);
    }

    group_info(group_id)
    {
        return this._GroupService.group_info(group_id)

        .then((group_info) =>
        {
            this._$scope.group_info = group_info;
        })

        .catch((err) =>
        {
            this._$rootScope.go_back();
        });
    }
}

export default GroupController;