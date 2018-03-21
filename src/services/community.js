export default class HotelCommunity
{
    constructor(HabboAPI, $rootScope, $q)
    {
        'ngInject';

        this.HabboAPI   = HabboAPI;
        this.$rootScope = $rootScope;
        this.$q         = $q;
    }

    loadCommunityInfo()
    {
        return this.HabboAPI.send('GET', '/community/info', null)

        .then((res) =>
        {
            if(res.data.communityInfo == undefined || null) return this.$q.reject('invalid_community');

            return this.$q.resolve(res.data.communityInfo);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadLeaderboardsInfo()
    {
        return this.HabboAPI.send('GET', '/community/leaderboards', null)

        .then((res) =>
        {
            if(res.data.leaderboardsInfo == undefined || null) return this.$q.reject('invalid_leaderboards');

            return this.$q.resolve(res.data.leaderboardsInfo);
        })

        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadStaffList()
    {
        return this.HabboAPI.send('GET', '/community/staff', null)

        .then((res) =>
        {
            if(res.data.staffList == undefined || null) return this.$q.reject('invalid_staff');

            let list = [];

            angular.forEach(res.data.staffList, (rank) =>
            {
                if(rank == null || rank.users == undefined || null) return;

                return list.push(rank);
            });

            return this.$q.resolve(list);
        })
        
        .catch((res) =>
        {
            return this.$q.reject(res.data.error);
        });
    }

    loadUsersOnline()
    {
        return this.HabboAPI.send('GET', '/community/usersOnline', null)

        .then((res) =>
        {
            return this.$rootScope.usersOnline = res.data.usersOnline;
        })

        .catch((res) =>
        {
            return this.$rootScope.usersOnline = 0;
        });
    }
}