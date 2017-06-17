import UserCardComponent from './user.card.component';
import UserListComponent from './user.list.component';

let componentsModule = angular.module('habboapi.components.users', []);

componentsModule.component('userCard', UserCardComponent);
componentsModule.component('userList', UserListComponent);

export default componentsModule;