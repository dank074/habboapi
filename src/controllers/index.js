import './community';
import './group';
import './guest';
import './room';
import './user';

const requires = [
    'habboapi.controllers.community',
    'habboapi.controllers.group',
    'habboapi.controllers.guest',
    'habboapi.controllers.room',
    'habboapi.controllers.user'
];

let controllersModule = angular.module('habboapi.controllers', requires);

export default controllersModule;