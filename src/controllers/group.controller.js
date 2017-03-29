class GroupController
{
    constructor(AppConstants, $state, $stateParams, $http, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$stateParams  = $stateParams;
        this._$http         = $http;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$scope.group_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;

        this._$http.post(this._AppConstants.api + '/controller/group/group_info', {group_id: this._$scope.group_id})
        
        .then((res) =>
        {
            this._$scope.group_info = res.data.group_info;
        })
        
        .catch((res) =>
        {
            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        });
    }
}

export default GroupController;