export default class HotelGroup
{
	constructor(HabboAPI, $q)
	{
		'ngInject';

		this.HabboAPI	= HabboAPI;
		this.$q			= $q;
	}

	loadGroupInfo(id)
	{
		if(id == 0 || null) return this.$q.reject('invalid_paraemters');
		
		return this.HabboAPI.send('POST', '/group/info', {id: id})

		.then((res) =>
		{
			if(res.data.groupInfo == undefined || null) return this.$q.reject('invalid_group');

			return this.$q.resolve(res.data.groupInfo);
		})

		.catch((res) =>
		{
			return this.$q.reject(res.data.error);
		});
	}
}