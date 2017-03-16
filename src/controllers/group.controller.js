class Group
{
    constructor(AppConstants, $window, $stateParams, $http, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$window = $window;
        this._$stateParams = $stateParams;
        this._$http = $http;
        this._$scope = $scope;

        this._$scope.group_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;
        
        if(this._$scope.group_id == '' || this._$scope.group_id == '0' || null) return this._$window.history.back();

        this._$http.post(this._AppConstants.api + '/controller/group/group_info', {
            group_id: this._$scope.group_id
        })

        .then((res) =>
        {
            if(res.data.group_info == undefined || null) this._$scope.group_info = null;

            this._$scope.group_info = res.data.group_info;
        })

        .catch((res) =>
        {
            return this._$window.history.back();
        })
    }
}

export default Group;