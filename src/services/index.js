import './authentication';
import './community';
import './system';
import './user';

const requires = [
    'habboapi.services.authentication',
    'habboapi.services.community',
    'habboapi.services.system',
    'habboapi.services.user'
];

let servicesModule = angular.module('habboapi.services', requires);

export default servicesModule;