import GroupCardComponent from './group.card.component';
import GroupListComponent from './group.list.component';
import GroupMembersComponent from './group.members.component';

let componentsModule = angular.module('habboapi.components.groups', []);

componentsModule.component('groupCard', GroupCardComponent);
componentsModule.component('groupList', GroupListComponent);
componentsModule.component('groupMembers', GroupMembersComponent);

export default componentsModule;