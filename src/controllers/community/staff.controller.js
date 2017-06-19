class StaffController
{
    constructor(AppConstants, CommunityService, $http, $q, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants      = AppConstants;
        this._CommunityService  = CommunityService;
        this._$http             = $http;
        this._$q                = $q;
        this._$rootScope        = $rootScope;
        this._$scope            = $scope;

        this._CommunityService.staff_users()

        .then((staff_users) =>
        {
            return this._$scope.data = staff_users;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }
}

export default StaffController;