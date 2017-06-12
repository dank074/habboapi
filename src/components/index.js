import GroupListComponent from './group.list.component';
import GroupMembersComponent from './group.members.component';
import RoomCardComponent from './room.card.component';
import RoomListComponent from './room.list.component';
import UserListComponent from './user.list.component';

let componentsModule = angular.module('habboapi.components', []);

componentsModule.component('groupList', GroupListComponent);
componentsModule.component('groupMembers', GroupMembersComponent);
componentsModule.component('roomCard', RoomCardComponent);
componentsModule.component('roomList', RoomListComponent);
componentsModule.component('userList', UserListComponent);

export default componentsModule;