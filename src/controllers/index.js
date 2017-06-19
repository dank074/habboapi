import './community';
import './guest';
import './user';

const requires = [
    'habboapi.controllers.community',
    'habboapi.controllers.guest',
    'habboapi.controllers.user'
];

let controllersModule = angular.module('habboapi.controllers', requires);

export default controllersModule;