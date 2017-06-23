class BannedController
{
    constructor(AppConstants, $stateParams, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$stateParams  = $stateParams;
        this._$scope        = $scope;

        this._$scope.ban = (this._$stateParams.ban == undefined || null) ? null : this._$stateParams.ban;

        if(this._$scope.ban == null) return this._$state.go('login');
    }
}

export default BannedController;