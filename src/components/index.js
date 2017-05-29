import GroupMembersComponent from './group.members.component';
import ProfileBadgesComponent from './profile.badges.component';
import ProfileFriendsComponent from './profile.friends.component';
import ProfileRoomsComponent from './profile.rooms.component';
import ProfileGroupsComponent from './profile.groups.component';

let componentsModule = angular.module('habboapi.components', []);

componentsModule.component('groupMembers', GroupMembersComponent);
componentsModule.component('profileBadges', ProfileBadgesComponent);
componentsModule.component('profileFriends', ProfileFriendsComponent);
componentsModule.component('profileRooms', ProfileRoomsComponent);
componentsModule.component('profileGroups', ProfileGroupsComponent);

export default componentsModule;