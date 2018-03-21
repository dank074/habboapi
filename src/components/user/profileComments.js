class UserProfileCommentsController
{
    constructor(HotelProfile, $mdDialog, $translate, $scope)
    {
        'ngInject';

        this.HotelProfile   = HotelProfile;
        this.$mdDialog      = $mdDialog;
        this.$translate     = $translate;
        this.$scope         = $scope;

        this.$onInit = () =>
        {
            this.$scope.commentList = [];
            this.$scope.loadList    = () => this.loadList();
            this.$scope.addComment  = () => this.addComment();
            this.$scope.listQuery   = {
                profileId: (this.$scope.$ctrl.profileId == '' || this.$scope.$ctrl.profileId == undefined || null) ? null : this.$scope.$ctrl.profileId,
                page: 1
            };

            this.loadList();
        }
    }

    loadList()
    {
        this.HotelProfile.loadProfileComments(this.$scope.listQuery)

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
            return this.HotelProfile.addProfileComment(this.$scope.$ctrl.profileId, message);
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

let UserProfileCommentsComponent = {
    bindings: {
        profileId: '='
    },
    controller: UserProfileCommentsController,
    templateUrl: 'views/user/profile/comments.html'
};

export default UserProfileCommentsComponent;