class LeaderboardsController
{
    constructor(AppConstants, LeaderboardsService, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants          = AppConstants;
        this._LeaderboardsService   = LeaderboardsService;
        this._$rootScope            = $rootScope;
        this._$scope                = $scope;

        this._LeaderboardsService.leaderboards_info()

        .then((leaderboards_info) =>
        {
            return this._$scope.leaderboards_info = leaderboards_info;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }
}

export default LeaderboardsController;