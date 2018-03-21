export default class NewsListController
{
    constructor(HotelNews, $rootScope, $scope)
    {
        'ngInject';
        
        this.HotelNews  = HotelNews;
        this.$rootScope = $rootScope;
        this.$scope     = $scope;

        this.$scope.newsList        = [];
        this.$scope.loadList        = () => this.loadList();
        this.$scope.listReset       = () => this.listReset();
        this.$scope.removeFilter    = () => this.removeFilter();
        this.$scope.createNewsLink  = (article) => this.HotelNews.createNewsLink(article);

        this.$onInit = () =>
        {
            this.$scope.listQuery = {
                filter: null,
                page: 1
            };
    
            this.$scope.listFilter = {
                show: false,
                options: {
                    debounce: 500
                }
            };

            this.$scope.$watch('listQuery.filter', (newValue, oldValue) =>
            {
                if(!oldValue) this.bookmark = this.$scope.listQuery.page;
                if(newValue !== oldValue) this.$scope.listQuery.page = 1;
                if(!newValue) this.$scope.listQuery.page = this.bookmark;

                this.loadList();
            });
        }
    }

    loadList()
    {
        return this.HotelNews.loadNewsList(this.$scope.listQuery)

        .then((newsList) =>
        {
            return this.$scope.newsList = newsList;
        })

        .catch((err) =>
        {
            return this.$scope.newsList = [];
        });
    }

    listReset()
    {
        this.$scope.listFilter.show   = false;
        this.$scope.listQuery.page    = 1;

        if(this.$scope.listQuery.filter != null)
        {
            if(this.$scope.listFilter.form && this.$scope.listFilter.form.$dirty) this.$scope.listFilter.form.$setPristine();

            this.$scope.listQuery.filter = null;
        }
    }
}