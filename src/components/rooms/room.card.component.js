class RoomCardController
{
    constructor(rCRONService, $scope)
    {
        'ngInject';

        this._rCRONService      = rCRONService;
        this._$scope            = $scope;

        this._$scope.enter_room = (id) =>
        {
            this._rCRONService.forward_room(id);
        };
    }
}

let RoomCardComponent = {
    bindings: {
        header: '=',
        data: '='
    },
    controller: RoomCardController,
    templateUrl: 'views/components/rooms/room.card.html'
};

export default RoomCardComponent;