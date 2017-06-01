class RoomCardController
{
    constructor($scope)
    {
        'ngInject';

        this._$scope    = $scope;
    }
}

let RoomCardComponent = {
    bindings: {
        roominfo: '='
    },
    controller: RoomCardController,
    templateUrl: 'views/room.card.html'
};

export default RoomCardComponent;