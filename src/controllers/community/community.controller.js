class CommunityController
{
    constructor(AppConstants, CommunityService, StatisticsService, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants          = AppConstants;
        this._CommunityService      = CommunityService;
        this._StatisticsService     = StatisticsService;
        this._$rootScope            = $rootScope;
        this._$scope                = $scope;

        this._CommunityService.community_info()

        .then((community_info) =>
        {
            this._$scope.community_info = community_info;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });

        this._StatisticsService.statistics_info()

        .then((statistics_info) =>
        {
            this._$scope.statistics_info = statistics_info;
        })

        .catch((err) =>
        {
            this._$scope.statistics_info = null;
        })
    }
}

export default CommunityController;