angular.module('app').controller('StaffController', function(AppConstants, $http, $scope)
{
    $http.get(AppConstants.api + '/controller/community/staff_users', {})
    
    .then(function resolve(res)
    {
        if(res.data.staff_users == undefined || null) $scope.staff_users = null;

        angular.forEach(res.data.staff_users, function(rank)
        {
            if(rank == undefined || null) delete res.data.staff_users[rank];
        });
        
        $scope.staff_users = res.data.staff_users;
    },
    
    function reject(res)
	{
        $scope.staff_users = null;
    });
});