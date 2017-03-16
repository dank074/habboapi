import angular from 'angular';
import CheckEmail from './check-email.directive';
import CheckUsername from './check-username.directive';
import GroupMembers from './group-members.directive';
import Logout from './logout.directive';
import MenuBar from './menu-bar.directive';
import ProfileRooms from './profile-rooms.directive';
import ProfileBadges from './profile-badges.directive';
import ProfileFriends from './profile-friends.directive';
import ProfileGroups from './profile-groups.directive';
import UserCard from './user-card.directive';

let directives = angular.module('habboapi.directives', []);

directives.directive('checkEmail', () => new CheckEmail);
directives.directive('checkUsername', () => new CheckUsername);
directives.directive('groupMembers', () => new GroupMembers);
directives.directive('appLogout', () => new Logout);
directives.directive('menuBar', () => new MenuBar);
directives.directive('userCard', () => new UserCard);
directives.directive('profileRooms', () => new ProfileRooms);
directives.directive('profileBadges', () => new ProfileBadges);
directives.directive('profileFriends', () => new ProfileFriends);
directives.directive('profileGroups', () => new ProfileGroups);

export default directives;