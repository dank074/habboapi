class StaffController
{
    constructor(AppConstants, $state, $http, $q, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$http         = $http;
        this._$q            = $q;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this.staff_users()

        .then((staff_users) =>
        {
            return this._$scope.staff_users = staff_users;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }

    staff_users()
    {
        return this._$http.get(this._AppConstants.api + '/service/community/staff_users')

        .then((res) =>
        {
            angular.forEach(res.data.staff_users, (rank) =>
            {
                if(rank == undefined || null) res.data.staff_users[rank] = undefined;
            });

            return this._$q.resolve(res.data.staff_users);
        })
        
        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'empty_staff' : res.data.error);
        });
    }
}

export default StaffController;