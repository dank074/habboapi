
	define(['app'], function(app)
	{
		function CheckEmailDirective(UserFactory)
		{
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function($scope, $element, $attrs, ngModel)
                {
                    $element.bind('blur', function()
                    {
                        if($element.val() == undefined || null) return;

                        UserFactory.validate_email($element.val())
                        
                        .then(function()
                        {
                            ngModel.$setValidity('email', true);
                            ngModel.$setValidity('email_unavailable', true);
                        })
                        
                        .catch(function(err)
                        {
                            switch(err)
                            {
                                case 'invalid_parameters': ngModel.$setValidity('required', false); break;
                                case 'invalid_format': ngModel.$setValidity('email', false); break;
                                case 'email_unavailable': ngModel.$setValidity('email_unavailable', false); break;
                            }
                        });
                    });
                }
            };
        };

		CheckEmailDirective.inject = ['UserFactory'];

		app.directive('appCheckEmail', CheckEmailDirective);
	});