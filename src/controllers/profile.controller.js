class Profile
{
    constructor(AppConstants, $window, $stateParams, $http, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$window = $window;
        this._$stateParams = $stateParams;
        this._$http = $http;
        this._$scope = $scope;

        this._$scope.profile_username = (this._$stateParams.username == undefined || null) ? null : this._$stateParams.username;
        
        if(this._$scope.user_name == '' || null) return this._$window.history.back();

        this._$http.post(this._AppConstants.api + '/controller/profile/profile_info', {
            user_name: this._$scope.profile_username
        })

        .then((res) =>
        {
            if(res.data.profile_info == undefined || null) this._$scope.profile_info = null;

            this._$scope.profile_info = res.data.profile_info;
        })

        .catch((res) =>
        {
            return this._$window.history.back();
        })
    }
}

export default Profile;