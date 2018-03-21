class RoomCommentsController
{
    constructor(HotelRoom, $mdDialog, $translate, $scope)
    {
        'ngInject';

        this.HotelRoom  = HotelRoom;
        this.$mdDialog  = $mdDialog;
        this.$translate = $translate;
        this.$scope     = $scope;

        this.$onInit = () =>
        {
            this.$scope.commentList = [];
            this.$scope.loadList    = () => this.loadList();
            this.$scope.addComment  = () => this.addComment();
            this.$scope.listQuery   = {
                roomId: (this.$scope.$ctrl.roomId == '' || this.$scope.$ctrl.roomId == undefined || null) ? null : this.$scope.$ctrl.roomId,
                page: 1
            };

            this.loadList();
        }
    }

    loadList()
    {
        this.HotelRoom.loadRoomComments(this.$scope.listQuery)

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
            return this.HotelRoom.addRoomComment(this.$scope.$ctrl.roomId, message);
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

let RoomCommentsComponent = {
    bindings: {
        roomId: '='
    },
    controller: RoomCommentsController,
    templateUrl: 'views/room/comments.html'
};

export default RoomCommentsComponent;