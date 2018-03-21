export default class UserProfileController
{
    constructor(HotelProfile, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this.HotelProfile   = HotelProfile;
        this.$stateParams   = $stateParams;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.username    = (this.$stateParams.username == undefined || null) ? null : this.$stateParams.username;
        this.$scope.profileInfo = [];

        this.$onInit = () => this.loadProfileInfo();
    }

    loadProfileInfo()
    {
        if(this.$scope.username == null) return this.$scope.profileInfo = [];

        return this.HotelProfile.loadProfileInfo(this.$scope.username)

        .then((profileInfo) =>
        {
            return this.$scope.profileInfo = profileInfo;
        })

        .catch((err) =>
        {
            if(this.$scope.username == null) return this.$scope.profileInfo = [];
        });
    }
}