class Community
{
    constructor(AppConstants, $http, $scope)
    {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$scope = $scope;

        this._$http.get(this._AppConstants.api + '/controller/community/community_info')

        .then((res) =>
        {
            if(res.data.community_info == undefined || null) this._$scope.community_info = null;

            this._$scope.community_info = res.data.community_info;
        })

        .catch((res) =>
        {
            return this._$window.history.back();
        })
    }
}

export default Community;