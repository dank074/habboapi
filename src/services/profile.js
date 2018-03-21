export default class HotelProfile
{
    constructor(HabboAPI, $localStorage, $q)
	{
		'ngInject';

        this.HabboAPI       = HabboAPI;
        this.$localStorage  = $localStorage;
		this.$q 		    = $q;
	}

    loadProfileInfo(username)
    {
        if(username == null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/user/profile/info', {username: username})
        
        .then((res) =>
        {
            if(res.data.profileInfo == undefined || null) return this.$q.reject('invalid_user');

            return this.$q.resolve(res.data.profileInfo);
        })
        
        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadProfileComments(query)
	{
		if(query == null) return this.$q.reject('invalid_parameters');

		return this.HabboAPI.send('POST', '/user/profile/comments/list', {query: query})

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
    
    addProfileComment(id, comment)
    {
        if(id == 0 || null || comment == null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/user/profile/comments/add', {id: id, comment: comment})

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