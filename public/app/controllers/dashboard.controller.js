
	define(['app'], function(app)
	{
		function DashboardController($scope)
		{
			$scope.announcement_list = [
			{
				announcement_name: "Test announcement",
				announcement_timestamp: "timestamp",
				announcement_content: "Test content"
			}];
		}

		DashboardController.inject = ['$scope'];

		app.controller('DashboardController', DashboardController);
	});