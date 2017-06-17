import './groups';
import './news';
import './profiles';
import './rooms';
import './users';

const requires = [
    'habboapi.components.groups',
    'habboapi.components.news',
    'habboapi.components.profiles',
    'habboapi.components.rooms',
    'habboapi.components.users'
];

let componentsModule = angular.module('habboapi.components', requires);

export default componentsModule;