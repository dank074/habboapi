angular.module('app').service('UtilityService', function($mdToast, $mdDialog)
{
	var UtilityService = {};

	UtilityService.toast = function(message)
	{
		if(message == null || message.length == 0) return;

		$mdToast.show(
			$mdToast.simple(
				{
					hideDelay: 3000,
					textContent: message
				}
			)
		);
	};

	UtilityService.alert = function(message)
	{
		if(message == null || message.length == 0) return;
		
		$mdDialog.show(
			$mdDialog.alert(
				{
					title: 'HabboAPI',
					textContent: message,
					ok: 'Close'
				}
			)
		);
	};

	return UtilityService;
});