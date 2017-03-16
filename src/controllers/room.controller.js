class Room
{
    constructor(AppConstants, $window, $stateParams, $http, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$window = $window;
        this._$stateParams = $stateParams;
        this._$http = $http;
        this._$scope = $scope;

        this._$scope.room_id = (this._$stateParams.id == undefined || null) ? null : this._$stateParams.id;
        
        if(this._$scope.room_id == '' || this._$scope.room_id == '0' || null) return this._$window.history.back();

        this._$http.post(this._AppConstants.api + '/controller/room/room_info', {
            room_id: this._$scope.room_id
        })

        .then((res) =>
        {
            if(res.data.room_info == undefined || null) this._$scope.room_info = null;

            this._$scope.room_info = res.data.room_info;
        })

        .catch((res) =>
        {
            return this._$window.history.back();
        })
    }
}

export default Room;