import './settings';

import UserClientController from './client';
import UserMeController from './me';
import UserProfileController from './profile';

const requires = [
    'habboapi.controllers.user.settings'
];

let userModule = angular.module('habboapi.controllers.user', requires);

userModule.controller('UserClientController', UserClientController);
userModule.controller('UserMeController', UserMeController);
userModule.controller('UserProfileController', UserProfileController);

export default userModule;