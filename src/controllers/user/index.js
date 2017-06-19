import BannedController from './banned.controller';
import ClientController from './client.controller';
import MeController from './me.controller';
import ProfileController from './profile.controller';
import SettingsController from './settings.controller';

let controllersModule = angular.module('habboapi.controllers.user', []);

controllersModule.controller('BannedController', BannedController);
controllersModule.controller('ClientController', ClientController);
controllersModule.controller('MeController', MeController);
controllersModule.controller('ProfileController', ProfileController);
controllersModule.controller('SettingsController', SettingsController);

export default controllersModule;