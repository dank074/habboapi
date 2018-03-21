export default class CommunityStaffController
{
    constructor(HotelCommunity, $rootScope, $scope)
    {
        'ngInject';

        this.HotelCommunity = HotelCommunity;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.staffList = [];

        this.$onInit = () => this.loadStaffList();
    }

    loadStaffList()
    {
        return this.HotelCommunity.loadStaffList()

        .then((staffList) =>
        {
            return this.$scope.staffList = staffList;
        })

        .catch((err) =>
        {
            return this.$scope.staffList = [];
        });
    }
}