export default class HotelRoom
{
	constructor(HabboAPI, $q)
	{
		'ngInject';

		this.HabboAPI	= HabboAPI;
		this.$q 		= $q;
	}

	loadRoomInfo(id)
	{
		if(id == 0 || null) return this.$q.reject('invalid_room');
		
		return this.HabboAPI.send('POST', '/room/info', {id: id})

		.then((res) =>
		{
			if(res.data.roomInfo == undefined || null) return this.$q.reject('invalid_room');

			return this.$q.resolve(res.data.roomInfo);
		})

		.catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
	}

	loadRoomComments(query)
	{
		if(query == null) return this.$q.reject('invalid_parameters');

		return this.HabboAPI.send('POST', '/room/comments/list', {query: query})

		.then((res) =>
		{
			if(res.data.commentList == undefined || null) return this.$q.reject('invalid_comments');

			return this.$q.resolve(res.data.commentList);
		})

		.catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
	}

	addRoomComment(id, comment)
    {
        if(id == 0 || null || comment == null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/room/comments/add', {id: id, comment: comment})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })

        .catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
    }
}