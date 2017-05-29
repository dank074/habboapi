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

        this._$http.post(this._AppConstants.api + '/hotel/profile/profile_info', {user_name: this._$scope.profile_username})
        
        .then((res) =>
        {
            this._$scope.profile_info = res.data.profile_info;
        })
        
        .catch((res) =>
        {
            return this._$rootScope.go_back();
        });
    }
}

export default ProfileController;