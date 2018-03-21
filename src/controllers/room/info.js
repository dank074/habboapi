export default class RoomInfoController
{
    constructor(HotelRoom, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this.HotelRoom      = HotelRoom;
        this.$stateParams   = $stateParams;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.id          = (this.$stateParams.id == undefined || null || this.$stateParams.id == '0') ? 0 : this.$stateParams.id;
        this.$scope.roomInfo    = [];

        this.$onInit = () => this.loadRoomInfo();
    }

    loadRoomInfo()
    {
        if(this.$scope.id == 0) return this.$scope.roomInfo = [];

        return this.HotelRoom.loadRoomInfo(this.$scope.id)

        .then((roomInfo) =>
        {
            return this.$scope.roomInfo = roomInfo;
        })
        
        .catch((err) =>
        {
            return this.$scope.roomInfo = [];
        });
    }
}