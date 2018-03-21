import RoomCardComponent from './card';
import RoomCommentsController from './comments';
import RoomListComponent from './list';

let roomModule = angular.module('habboapi.components.room', []);

roomModule.component('apiRoomCard', RoomCardComponent);
roomModule.component('apiRoomComments', RoomCommentsController);
roomModule.component('apiRoomList', RoomListComponent);

export default roomModule;