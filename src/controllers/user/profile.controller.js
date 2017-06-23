class ProfileController
{
    constructor(AppConstants, ProfileService, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants      = AppConstants;
        this._ProfileService    = ProfileService;
        this._$stateParams      = $stateParams;
        this._$rootScope        = $rootScope;
        this._$scope            = $scope;

        this._$scope.profile_username = (this._$stateParams.username == undefined || null) ? null : this._$stateParams.username;

        this.profile_info(this._$scope.profile_username);
    }

    profile_info(user_name)
    {
        return this._ProfileService.profile_info(user_name)

        .then((profile_info) =>
        {
            this._$scope.profile_info = profile_info;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }
}

export default ProfileController;