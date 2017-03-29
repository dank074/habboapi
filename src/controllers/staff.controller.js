import angular from 'angular';

class StaffController
{
    constructor(AppConstants, $state, $http, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$http         = $http;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$http.get(this._AppConstants.api + '/controller/community/staff_users')

        .then((res) =>
        {
            angular.forEach(res.data.staff_users, (rank) =>
            {
                if(rank == undefined || null) res.data.staff_users[rank] = undefined;
            });

            this._$scope.staff_users = res.data.staff_users;
        })

        .catch((res) =>
        {
            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        });
    }
}

export default StaffController;