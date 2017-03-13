angular.module('app').directive('userInfoCard', function()
{
    return {
		restrict: 'E',
		replace: true,
        scope: {
            userid: '=userid',
            userinfo: '=userinfo'
        },
		templateUrl: 'user-info-card.directive.html'
	}
});