class RoomController
{
    constructor(AppConstants, $state, $stateParams, $http, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$stateParams  = $stateParams;
        this._$http         = $http;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this._$scope.room_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;

        this._$http.post(this._AppConstants.api + '/controller/room/room_info', {room_id: this._$scope.room_id})
        
        .then((res) =>
        {
            this._$scope.room_info = res.data.room_info;
        })
        
        .catch((res) =>
        {
            return this._$state.go(this._$rootScope.previous_state.name, this._$rootScope.previous_params);
        });
    }
}

export default RoomController;