class ProfileController
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

        this._$scope.profile_username = (this._$stateParams.username == undefined || null) ? null : this._$stateParams.username;

        this._$http.post(this._AppConstants.api + '/controller/profile/profile_info', {user_name: this._$scope.profile_username})
        
        .then((res) =>
        {
            this._$scope.profile_info = res.data.profile_info;
        })
        
        .catch((res) =>
        {
            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        });
    }
}

export default ProfileController;