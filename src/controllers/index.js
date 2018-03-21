import './community';
import './group';
import './guest';
import './news';
import './room';
import './user';

const requires = [
    'habboapi.controllers.community',
    'habboapi.controllers.group',
    'habboapi.controllers.guest',
    'habboapi.controllers.news',
    'habboapi.controllers.room',
    'habboapi.controllers.user'
];

let controllersModule = angular.module('habboapi.controllers', requires);

export default controllersModule;