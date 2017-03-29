class UtilityService
{
	constructor($mdToast, $mdDialog, $translate)
	{
		'ngInject';

		this._$mdToast 		= $mdToast;
		this._$mdDialog 	= $mdDialog;
		this._$translate 	= $translate;
	}

	toast(message)
	{
		if(message == '' || null) return;

		return this._$translate(message)
		
		.then((text) =>
		{
			return this._$mdToast.show(
				this._$mdToast.simple({
					hideDelay: 3000,
					textContent: text
				}));
		});
	}

	alert(message)
	{
		if(message == '' || null) return;

		return this._$translate([message, 'dialogs.title', 'dialogs.ok'])
		
		.then((text) =>
		{
			return this._$mdDialog.show(
				this._$mdDialog.alert({
					title: text['dialogs.title'],
					textContent: text[message],
					ok: text['dialogs.ok']
				}));
		});
	}
}

export default UtilityService;