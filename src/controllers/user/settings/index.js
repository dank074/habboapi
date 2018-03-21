import UserSettingsEmailController from './email';
import UserSettingsGeneralController from './general';
import UserSettingsPasswordController from './password';

let settingsModule = angular.module('habboapi.controllers.user.settings', []);

settingsModule.controller('UserSettingsEmailController', UserSettingsEmailController);
settingsModule.controller('UserSettingsGeneralController', UserSettingsGeneralController);
settingsModule.controller('UserSettingsPasswordController', UserSettingsPasswordController);

export default settingsModule;