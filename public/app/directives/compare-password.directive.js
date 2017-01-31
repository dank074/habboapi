
	define(['app'], function(app)
	{
		function ComparePasswordDirective()
		{
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    comparePassword: "=comparePassword"
                },
                link: function($scope, $element, $attrs, ngModel)
                {
                    ngModel.$validators.password_match = function(value)
                    {
                        return value == $scope.comparePassword;
                    };
                    
                    $scope.$watch("password_match", function()
                    {
                        ngModel.$validate();
                    });
                }
            };
        };

		ComparePasswordDirective.inject = [];

		app.directive('appComparePassword', ComparePasswordDirective);
	});