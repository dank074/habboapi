/**
  * HabboAPI
  * menuDirective
  *
  * @package habboapi
  * @author Bill (billsonnn)
  */

	define(["app"], function(app)
	{
		function menuDirective($localStorage)
		{
			if($localStorage.current_user.login_status == true)
			{
				return {
					restrict: "E",
					template: "<div ng-class='{ show: visible, left: alignment === \"left\", right: alignment === \"right\" }' ng-transclude></div>",
					transclude: true,
					scope: {
						visible: "=",
						alignment: "@"
					}
				};
			}
			
			return;
        };

		menuDirective.inject = ["$localStorage"];

		app.directive("app-menu", menuDirective);
	});