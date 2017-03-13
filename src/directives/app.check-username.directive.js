angular.module('app').directive('checkUsername', function(UserService)
{
	return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel)
        {
            element.on('blur', function()
            {
                if(element.val() == undefined || null || element.val() == '') return;

                return UserService.validate_username(element.val())

                .then(function resolve()
                {
                    return ngModel.$setValidity('username_unavailable', true);
                },
                
                function reject()
                {
                    return ngModel.$setValidity('username_unavailable', false);
                });
            });
        }
    }
});