
	define(['app'], function(app)
	{
		function CheckUsernameDirective(UserFactory)
		{
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function($scope, $element, $attrs, ngModel)
                {
                    $element.bind('blur', function()
                    {
                        if($element.val() == undefined || null) return;

                        UserFactory.validate_username($element.val())
                        
                        .then(function()
                        {
                            ngModel.$setValidity('invalid_format', true);
                            ngModel.$setValidity('username_unavailable', true);
                        })
                        
                        .catch(function(err)
                        {
                            switch(err)
                            {
                                case 'invalid_parameters': ngModel.$setValidity('required', false); break;
                                case 'invalid_format': ngModel.$setValidity('invalid_format', false); break;
                                case 'username_unavailable': ngModel.$setValidity('username_unavailable', false); break;
                            }
                        });
                    });
                }
            };
        };

		CheckUsernameDirective.inject = ['UserFactory'];

		app.directive('appCheckUsername', CheckUsernameDirective);
	});