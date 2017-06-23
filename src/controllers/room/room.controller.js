class RoomController
{
    constructor(AppConstants, RoomService, $stateParams, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._RoomService   = RoomService;
        this._$stateParams  = $stateParams;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$scope.room_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;

        this.room_info(this._$scope.room_id);
    }

    room_info(room_id)
    {
        return this._RoomService.room_info(room_id)

        .then((room_info) =>
        {
            this._$scope.room_info = room_info;
        })
        
        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }
}

export default RoomController;