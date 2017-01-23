
	define(['app'], function(app)
	{
		function CheckEmailDirective($http)
		{
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function($scope, $element, $attrs, ngModel)
                {
                    $element.bind('blur', function()
                    {
                        if($element.val().length == 0)
                        {
                            ngModel.$setValidity('required', false);
                        }
                        else
                        {
                            $http.post('controller/register/validate_email', {email_address: $element.val()})
                            
                            .then(function(response)
                            {
                                ngModel.$setValidity('email_taken', true);
                            })
                            
                            .catch(function(err)
                            {
                                ngModel.$setValidity('email_taken', false);
                            });
                        }
                    });
                }
            };
        };

		CheckEmailDirective.inject = ['$http'];

		app.directive('appCheckEmail', CheckEmailDirective);
	});