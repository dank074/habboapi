class NewsListController
{
    constructor($mdDialog, $scope)
    {
        'ngInject';

        this._$mdDialog = $mdDialog;
        this._$scope    = $scope;

        this._$scope.show_all = (event) =>
        {
            $mdDialog.show({
                contentElement: '#' + this._$scope.$ctrl.type + '-dialog',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            });
        };

        this._$scope.hide = () =>
        {
            $mdDialog.hide();
        };
    }
}

let NewsListComponent = {
    bindings: {
        header: '=',
        type: '@',
        data: '='
    },
    controller: NewsListController,
    templateUrl: 'views/components/news/news.list.html'
};

export default NewsListComponent;