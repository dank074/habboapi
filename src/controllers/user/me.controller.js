class MeController
{
    constructor(UtilityService, NewsService, $scope)
    {
        'ngInject';
        
        this._UtilityService    = UtilityService;
        this._NewsService       = NewsService;
        this._$scope            = $scope;

        this.news_list();
    }

    news_list()
    {
        return this._NewsService.news_list()

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