class CommunityService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	community_info()
	{
		return this._$http.get(this._AppConstants.api + '/services/community/community/community_info')

		.then((res) =>
		{
			return this._$q.resolve(res.data.community_info);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'no_community' : res.data.error);
		});
	}

	staff_users()
    {
        return this._$http.get(this._AppConstants.api + '/services/community/community/staff_users')

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
            return this._$q.reject((res.data.error == undefined || null) ? 'no_staff' : res.data.error);
        });
    }
}

export default CommunityService;