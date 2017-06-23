class RoomService
{
	constructor(AppConstants, $http, $q)
	{
		'ngInject';

		this._AppConstants 	= AppConstants;
		this._$http 		= $http;
		this._$q 			= $q;
	}

	room_info(room_id)
	{
		return this._$http.post(this._AppConstants.api + '/room/room_info', {room_id: room_id})

		.then((res) =>
		{
			return this._$q.resolve(res.data.room_info);
		})

		.catch((res) =>
		{
			return this._$q.reject((res.data.error == undefined || null) ? 'invalid_room' : res.data.error);
		});
	}
}

export default RoomService;