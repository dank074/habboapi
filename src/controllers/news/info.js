export default class NewsInfoController
{
    constructor(HotelNews, $state, $stateParams, $rootScope, $scope)
    {
        'ngInject';
        
        this.HotelNews      = HotelNews;
        this.$state         = $state;
        this.$stateParams   = $stateParams;
        this.$rootScope     = $rootScope;
        this.$scope         = $scope;

        this.$scope.id          = (this.$stateParams.id == undefined || null) ? null : this.HotelNews.getNewsIdFromLink(this.$stateParams.id);
        this.$scope.articleInfo = [];

        this.$onInit = () => this.loadNewsArticle();
    }

    loadNewsArticle()
    {
        if(this.$scope.id == 0) return this.$scope.articleInfo = [];

        return this.HotelNews.loadNewsArticle(this.$scope.id)

        .then((articleInfo) =>
        {
            if(this.$scope.id == 'latest')
            {
                this.$scope.id = articleInfo.id;

                this.$state.transitionTo('community.news.info', {id: this.HotelNews.createNewsLink(articleInfo)}, {
                    location: 'replace',
                    inherit: true,
                    relative: this.$state.$current,
                    notify: false
                });
            }

            return this.$scope.articleInfo = articleInfo;
        })

        .catch((err) =>
        {
            return this.$scope.articleInfo = [];
        })
    }
}