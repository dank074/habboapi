angular.module('app').controller('CommunityController', function(AppConstants, $http, $scope)
{
    $http.get(AppConstants.api + '/controller/community/community_info', {})
    
    .then(function resolve(res)
    {
        if(res.data.community_info == undefined || null) $scope.community_info = null;
        
        $scope.community_info = res.data.community_info;
    },
    
    function reject(res)
	{
        $scope.community_info = null;
    });
});