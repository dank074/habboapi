import NewsCommentsComponent from './comments';

let newsModule = angular.module('habboapi.components.news', []);

newsModule.component('apiNewsComments', NewsCommentsComponent);

export default newsModule;