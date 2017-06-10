import 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-ui-router';
import 'ui-router-extras';
import 'ngstorage';

import Constants from './config/constants.json';
import Config from './config/config';
import Run from './config/run';

import './components';
import './controllers';
import './controllers/housekeeping';
import './directives';
import './directives/housekeeping';
import './services';

import './config/template-cache';

const requires = [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngMaterial',
    'ngSanitize',
    'pascalprecht.translate',
    'ui.router',
    'ct.ui.router.extras',
    'ngStorage',
    'app.templates',
    'habboapi.components',
    'habboapi.controllers',
    'habboapi.controllers.housekeeping',
    'habboapi.directives',
    'habboapi.directives.housekeeping',
    'habboapi.services'
];

window.app = angular.module('habboapi', requires);

angular.module('habboapi').constant('AppConstants', Constants.constants);
angular.module('habboapi').config(Config);
angular.module('habboapi').run(Run);

angular.bootstrap(document, ['habboapi'], { strictDi: true });