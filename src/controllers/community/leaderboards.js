export default class CommunityLeaderboardsController
{
    constructor(HotelCommunity, $rootScope, $scope)
    {
        'ngInject';

        this.HotelCommunity = HotelCommunity;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.leaderboardsInfo = [];

        this.$onInit = () => this.loadLeaderboardsInfo();
    }

    loadLeaderboardsInfo()
    {
        return this.HotelCommunity.loadLeaderboardsInfo()

        .then((leaderboardsInfo) =>
        {
            return this.$scope.leaderboardsInfo = leaderboardsInfo;
        })

        .catch((err) =>
        {
            return this.$scope.leaderboardsInfo = [];
        });
    }
}