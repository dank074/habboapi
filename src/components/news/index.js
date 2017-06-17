import NewsListComponent from './news.list.component';

let componentsModule = angular.module('habboapi.components.news', []);

componentsModule.component('newsList', NewsListComponent);

export default componentsModule;