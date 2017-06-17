import RoomCardComponent from './room.card.component';
import RoomListComponent from './room.list.component';

let componentsModule = angular.module('habboapi.components.rooms', []);

componentsModule.component('roomCard', RoomCardComponent);
componentsModule.component('roomList', RoomListComponent)

export default componentsModule;