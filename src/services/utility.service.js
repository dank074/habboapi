class Utility
{
	constructor($mdToast, $mdDialog)
	{
		'ngInject';

		this._$mdToast = $mdToast;
		this._$mdDialog = $mdDialog;
	}

	toast(message)
	{
		if(message == '' || null) return;

		this._$mdToast.show(
			this._$mdToast.simple({
				hideDelay: 3000,
				textContent: message
			})
		);
	}

	alert(message)
	{
		if(message == '' || null) return;

		this._$mdDialog.show(
			this._$mdDialog.alert({
				title: 'HabboAPI',
				textContent: message,
				ok: 'Close'
			})
		);
	}
}

export default Utility;