class LeaderboardsService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	leaderboards_info()
	{
		return this._$http.get(this._AppConstants.api + '/services/community/leaderboards/leaderboards_info')

		.then((res) =>
		{
			return this._$q.resolve(res.data.leaderboards_info);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'no_leaderboards' : res.data.error);
		});
	}
}

export default LeaderboardsService;