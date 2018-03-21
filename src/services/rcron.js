export default class HotelrCRON
{
    constructor(HabboAPI, $q)
    {
        'ngInject';

        this.HabboAPI   = HabboAPI;
        this.$q         = $q;
    }

    friendRequest(targetId)
    {
        if(targetId == 0 || null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/rcron/friendRequest', {targetId: targetId})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })
        
        .catch((err) =>
        {
            return this.$q.reject(err.data.error);
        });
    }

    stalkUser(targetId)
    {
        if(targetId == 0 || null) return this.$q.reject('invalid_parameters');

        return this.HabboAPI.send('POST', '/rcron/stalkUser', {targetId: targetId})

        .then((res) =>
        {
            return this.$q.resolve(null);
        })
        
        .catch((err) =>
        {
            return this.$q.reject(err.data.error);
        });
    }
}