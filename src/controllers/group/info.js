export default class GroupInfoController
{
    constructor(HotelGroup, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this.HotelGroup     = HotelGroup;
        this.$stateParams   = $stateParams;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.id          = (this.$stateParams.id == undefined || null) ? 0 : this.$stateParams.id;
        this.$scope.groupInfo   = [];

        this.$onInit = () => this.loadGroupInfo();
    }

    loadGroupInfo()
    {
        if(this.$scope.id == 0) return this.$scope.groupInfo = [];

        return this.HotelGroup.loadGroupInfo(this.$scope.id)

        .then((groupInfo) =>
        {
            return this.$scope.groupInfo = groupInfo;
        })

        .catch((err) =>
        {
            return this.$scope.groupInfo = [];
        });
    }
}