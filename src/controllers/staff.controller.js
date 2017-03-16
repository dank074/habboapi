import angular from 'angular';

class Staff
{
    constructor(AppConstants, $http, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$scope = $scope;

        this._$http.get(this._AppConstants.api + '/controller/community/staff_users')

        .then((res) =>
        {
            if(res.data.staff_users == undefined || null) this._$scope.staff_users = null;

            angular.forEach(res.data.staff_users, (rank) =>
            {
                if(rank == undefined || null) delete res.data.staff_users[rank];
            });

            this._$scope.staff_users = res.data.staff_users;
        })

        .catch((res) =>
        {
            this._$scope.staff_users = null;
        });
    }
}

export default Staff;