import BannedController from './banned.controller';
import ClientController from './client.controller';
import MeController from './me.controller';
import ProfileController from './profile.controller';
import SettingsController from './settings.controller';

let userModule = angular.module('habboapi.controllers.user', []);

userModule.controller('BannedController', BannedController);
userModule.controller('ClientController', ClientController);
userModule.controller('MeController', MeController);
userModule.controller('ProfileController', ProfileController);
userModule.controller('SettingsController', SettingsController);

export default userModule;