class MeController
{
    constructor(UtilityService, $state, $scope)
    {
        'ngInject';
        
        this._UtilityService    = UtilityService;
        this._$state 	        = $state;
        this._$scope            = $scope;
    }
}

export default MeController;