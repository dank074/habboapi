class StatisticsService
{
    constructor(AppConstants, $http, $q)
    {
        'ngInject';

        this._AppConstants 	= AppConstants;
        this._$http 		= $http;
        this._$q 			= $q;
    }

    statistics_info()
    {
        return this._$http.get(this._AppConstants.api + '/community/statistics/statistics_info')

        .then((res) =>
        {
            return this._$q.resolve(res.data.statistics_info);
        })

        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'no_statistics' : res.data.error);
        });
    }

    users_online()
    {
        return this._$http.get(this._AppConstants.api + '/community/statistics/users_online')

        .then((res) =>
        {
            return this._$q.resolve(res.data.users_online);
        })

        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'no_users' : res.data.error);
        });
    }
}

export default StatisticsService;