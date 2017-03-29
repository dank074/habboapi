class CommunityController
{
    constructor(AppConstants, $state, $http, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$http         = $http;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$http.get(this._AppConstants.api + '/controller/community/community_info')
        
        .then((res) =>
        {
            this._$scope.community_info = res.data.community_info;
        })
        
        .catch((res) =>
        {
            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        });
    }
}

export default CommunityController;