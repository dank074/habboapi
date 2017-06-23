class StaffController
{
    constructor(AppConstants, StaffService, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants      = AppConstants;
        this._StaffService      = StaffService;
        this._$rootScope        = $rootScope;
        this._$scope            = $scope;

        this.staff_list();
    }

    staff_list()
    {
        return this._StaffService.staff_list()

        .then((staff_list) =>
        {
            return this._$scope.data = staff_list;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }


}

export default StaffController;