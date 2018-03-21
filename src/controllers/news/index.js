import NewsInfoController from './info';
import NewsListController from './list';

let newsModule = angular.module('habboapi.controllers.news', []);

newsModule.controller('NewsInfoController', NewsInfoController);
newsModule.controller('NewsListController', NewsListController);

export default newsModule;