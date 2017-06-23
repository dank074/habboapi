class GroupService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	group_info(group_id)
	{
		return this._$http.post(this._AppConstants.api + '/group/group_info', {group_id: group_id})

		.then((res) =>
		{
			return this._$q.resolve(res.data.group_info);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_group' : res.data.error);
		});
	}
}

export default GroupService;