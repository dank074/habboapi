class NewsCommentsController
{
    constructor(HotelNews, $mdDialog, $translate, $scope)
    {
        'ngInject';

        this.HotelNews  = HotelNews;
        this.$mdDialog  = $mdDialog;
        this.$translate = $translate;
        this.$scope     = $scope;

        this.$onInit = () =>
        {
            this.$scope.commentList = [];
            this.$scope.loadList    = () => this.loadList();
            this.$scope.addComment  = () => this.addComment();
            this.$scope.listQuery   = {
                articleId: (this.$scope.$ctrl.articleId == undefined || this.$scope.$ctrl.articleId == '' || null) ? null : this.$scope.$ctrl.articleId,
                page: 1
            };

            this.loadList();
        }
    }

    loadList()
    {
        this.HotelNews.loadNewsComments(this.$scope.listQuery)

        .then((commentList) =>
        {
            this.$scope.commentList = commentList;
        })

        .catch((err) =>
        {
            this.$scope.commentList = null;
        });
    }

    addComment()
    {
        let dialog = this.$mdDialog.prompt()
            .title(this.$translate.instant('generic.messages.alertTitle'))
            .textContent(this.$translate.instant('generic.messages.commentPrompt'))
            .placeholder(this.$translate.instant('generic.forms.comment'))
            .targetEvent(event)
            .ok(this.$translate.instant('generic.buttons.post'))
            .cancel(this.$translate.instant('generic.buttons.cancel'));
        
        this.$mdDialog.show(dialog)

        .then((message) =>
        {
            return this.HotelNews.addNewsComment(this.$scope.$ctrl.articleId, message);
        })

        .then(() =>
        {
            this.loadList();
        })

        .catch((err) =>
        {
            return;
        });
    }
}

let NewsCommentsComponent = {
    bindings: {
        articleId: '='
    },
    controller: NewsCommentsController,
    templateUrl: 'views/news/comments.html'
};

export default NewsCommentsComponent;