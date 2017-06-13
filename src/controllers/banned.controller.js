class BannedController
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

        this._$scope.ban = (this._$stateParams.ban == undefined || null) ? null : this._$stateParams.ban;

        if(this._$scope.ban == null) return this._$state.go('login');
    }
}

export default BannedController;