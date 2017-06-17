import ProfileBadgesComponent from './profile.badges.component';
import ProfileFriendsComponent from './profile.friends.component';
import ProfileGroupsComponent from './profile.groups.component';
import ProfileRoomsComponent from './profile.rooms.component';

let componentsModule = angular.module('habboapi.components.profiles', []);

componentsModule.component('profileBadges', ProfileBadgesComponent);
componentsModule.component('profileFriends', ProfileFriendsComponent);
componentsModule.component('profileGroups', ProfileGroupsComponent);
componentsModule.component('profileRooms', ProfileRoomsComponent);

export default componentsModule;