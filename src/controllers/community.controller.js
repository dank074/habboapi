class CommunityController
{
    constructor(AppConstants, $state, $http, $q, $rootScope, $scope)
    {
        'ngInject';

        this._AppConstants  = AppConstants;
        this._$state        = $state;
        this._$http         = $http;
        this._$q            = $q;
        this._$rootScope    = $rootScope;
        this._$scope        = $scope;

        this.community_info()

        .then((community_info) =>
        {
            return this._$scope.community_info = community_info;
        })

        .catch((err) =>
        {
            return this._$rootScope.go_back();
        });
    }

    community_info()
    {
        return this._$http.get(this._AppConstants.api + '/service/community/community_info')
        
        .then((res) =>
        {
            return this._$q.resolve(res.data.community_info);
        })
        
        .catch((res) =>
        {
            return this._$q.reject((res.data.error == undefined || null) ? 'empty_community' : res.data.error);
        });
    }
}

export default CommunityController;