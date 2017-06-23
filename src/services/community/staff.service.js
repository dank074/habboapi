class StaffService
{
    constructor(AppConstants, $http, $q)
    {
        'ngInject';

        this._AppConstants 	= AppConstants;
        this._$http 		= $http;
        this._$q 			= $q;
    }

    staff_list()
    {
        return this._$http.get(this._AppConstants.api + '/community/staff/staff_list')

        .then((res) =>
        {
            angular.forEach(res.data.staff_list, (rank) =>
            {
                if(rank == undefined || null) res.data.staff_list[rank] = undefined;
            });

            return this._$q.resolve(res.data.staff_list);
        })
        
        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'invalid_staff' : res.data.error);
        });
    }
}

export default StaffService;