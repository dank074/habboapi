export default class CommunityHomeController
{
    constructor(HotelCommunity, $rootScope, $scope)
    {
        'ngInject';

        this.HotelCommunity = HotelCommunity;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.communityInfo = [];

        this.$onInit = () => this.loadCommunityInfo();
    }

    loadCommunityInfo()
    {
        return this.HotelCommunity.loadCommunityInfo()

        .then((communityInfo) =>
        {
            return this.$scope.communityInfo = communityInfo;
        })

        .catch((err) =>
        {
            return this.$scope.communityInfo = [];
        });
    }
}