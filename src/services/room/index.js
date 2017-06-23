import RoomService from './room.service';

let roomModule = angular.module('habboapi.services.room', []);

roomModule.service('RoomService', RoomService);

export default roomModule;