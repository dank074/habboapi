import './badge';
import './group';
import './news';
import './room';
import './user';

import FooterComponent from './footer';
import HeaderComponent from './header';
import NavigationComponent from './navigation';

const requires = [
    'habboapi.components.badge',
    'habboapi.components.group',
    'habboapi.components.news',
    'habboapi.components.room',
    'habboapi.components.user'
];

let componentsModule = angular.module('habboapi.components', requires);

componentsModule.component('apiFooter', FooterComponent);
componentsModule.component('apiHeader', HeaderComponent);
componentsModule.component('apiNavigation', NavigationComponent);

export default componentsModule;