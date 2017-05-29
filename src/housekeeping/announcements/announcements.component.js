class AnnouncementsController
{
    constructor(Utility, AnnouncementService, $mdDialog, $scope)
    {
        'ngInject';
        
        this._Utility               = Utility;
        this._AnnouncementService   = AnnouncementService;
        this._$mdDialog             = $mdDialog;
        this._$scope                = $scope;

        this._$scope.announcement_list      = [];
        this._$scope.announcement_details   = [];

        this.load_announcements();

        this._$scope.load_announcements     = () => this.load_announcements();
        this._$scope.add_announcement       = () => this.add_announcement();
        this._$scope.show_add               = () => this.show_add();
        this._$scope.hide_add               = () => this.hide_add();
    }

    load_announcements()
    {
        this._AnnouncementService.announcement_list()

        .then((announcement_list) =>
        {
            this._$scope.announcement_list = announcement_list;
        })

        .catch((err) =>
        {
            this._$scope.announcement_list = [];
        });
    }
    
    add_announcement()
    {
        this._AnnouncementService.add_announcement(this._$scope.announcement_details.title, this._$scope.announcement_details.content)

        .then(() =>
        {
            this.hide_add();
            
            this._Utility.alert('dialogs.announcement_added');

            this.load_announcemnts();
        })

        .catch((err) =>
        {
            this._Utility.alert('dialogs.something_wrong');
        });
    }

    show_add()
    {
        this._$mdDialog.show({
            contentElement: '#add-announcement',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: false
        });
    }

    hide_add()
    {
        this._$mdDialog.hide();

        this._$scope.announcement_details = [];
    }
}

let AnnouncementsComponent = {
    controller: AnnouncementsController,
    templateUrl: 'announcements/announcements.html'
};

export default AnnouncementsComponent;