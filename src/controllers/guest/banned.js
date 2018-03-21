export default class GuestBannedController
{
    constructor($state, $stateParams, $scope)
    {
        'ngInject';

        this.$state         = $state;
        this.$stateParams   = $stateParams;
        this.$scope         = $scope;

        this.$scope.banReason   = this.$stateParams.reason;
        this.$scope.banExpires  = this.$stateParams.expires;

        if(this.$scope.banReason == undefined || null || this.$scope.banExpires == undefined || null) return this.$state.go('login');
    }
}