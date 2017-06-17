class MeController
{
    constructor(UtilityService, NewsService, $state, $scope)
    {
        'ngInject';
        
        this._UtilityService    = UtilityService;
        this._NewsService       = NewsService;
        this._$state 	        = $state;
        this._$scope            = $scope;

        this._NewsService.news_list()

        .then((news_list) =>
        {
            return this._$scope.news_list = news_list;
        })

        .catch((err) =>
        {
            return this._$scope.news_list = null;
        });
    }
}

export default MeController;