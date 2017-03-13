angular.module('app').directive('checkEmail', function(UserService)
{
	return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel)
        {
            element.on('blur', function()
            {
                if(element.val() == undefined || null || element.val() == '') return;

                return UserService.validate_email(element.val())

                .then(function resolve()
                {
                    return ngModel.$setValidity('email_unavailable', true);
                },
                
                function reject()
                {
                    return ngModel.$setValidity('email_unavailable', false);
                });
            });
        }
    }
});