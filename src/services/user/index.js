import ProfileService from './profile.service';
import rCRONService from './rcron.service';
import UserService from './user.service';

let userModule = angular.module('habboapi.services.user', []);

userModule.service('ProfileService', ProfileService);
userModule.service('rCRONService', rCRONService);
userModule.service('UserService', UserService);

export default userModule;