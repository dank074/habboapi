import RoomController from './room.controller';

let roomModule = angular.module('habboapi.controllers.room', []);

roomModule.controller('RoomController', RoomController);

export default roomModule;