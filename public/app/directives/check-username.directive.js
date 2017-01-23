
	define(['app'], function(app)
	{
		function CheckUsernameDirective($http)
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
                            $http.post('controller/register/validate_username', {user_name: $element.val()})
                            
                            .then(function(response)
                            {
                                ngModel.$setValidity('username_taken', true);
                            })
                            
                            .catch(function(err)
                            {
                                ngModel.$setValidity('username_taken', false);
                            });
                        }
                    });
                }
            };
        };

		CheckUsernameDirective.inject = ['$http'];

		app.directive('appCheckUsername', CheckUsernameDirective);
	});