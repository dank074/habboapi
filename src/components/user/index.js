import UserCardComponent from './card';
import UserListComponent from './list';
import UserProfileCommentsComponent from './profileComments';

let userModule = angular.module('habboapi.components.user', []);

userModule.component('apiUserCard', UserCardComponent);
userModule.component('apiUserList', UserListComponent);
userModule.component('apiUserProfileComments', UserProfileCommentsComponent);

export default userModule;