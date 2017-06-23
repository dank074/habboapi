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
        return this._$http.get(this._AppConstants.api + '/community/community_info')

        .then((res) =>
        {
            return this._$q.resolve(res.data.community_info);
        })

        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'invalid_community' : res.data.error);
        });
    }
}

export default CommunityService;