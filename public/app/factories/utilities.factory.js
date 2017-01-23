
	define(['app'], function(app)
	{
		function Utilities($q, $mdToast, $mdDialog)
		{
			var Utilities = {};

			Utilities.toast = function(options)
			{
				var options = {
					hideDelay: (options.hideDelay == undefined || angular.isNumber(options.hideDelay) == false) ? 3000 : options.hideDelay,
					textContent: (options.textContent == undefined || options.textContent == null) ? null : options.textContent
				};

				$mdToast.show($mdToast.simple(options));
			};

			Utilities.alert = function(options)
			{
				var options = {
					title: (options.title == undefined || options.title == null) ? 'HabboAPI' : options.title,
					textContent: (options.textContent == undefined || options.textContent == null) ? null : options.textContent,
					ok: (options.ok == undefined || options.ok == null) ? 'Close' : options.ok
				};
				
				$mdDialog.show($mdDialog.alert(options));
			};

			Utilities.confirm = function(options)
			{
				var options = {
					title: (options.title == undefined || options.title == null) ? 'HabboAPI' : options.title,
					textContent: (options.textContent == undefined || options.textContent == null) ? null : options.textContent,
					ok: (options.ok == undefined || options.ok == null) ? 'Yes' : options.ok,
					cancel: (options.cancel == undefined || options.cancel == null) ? 'Close' : options.cancel
				};

				return $q(function(resolve, reject)
				{
					$mdDialog.show($mdDialog.confirm(options))
					
					.then(function()
					{
						return resolve(null);
					},

					function()
					{
						return reject(null);
					});
				});
			};

			return Utilities;
		}

		Utilities.$inject = ['$q', '$mdToast', '$mdDialog'];

		app.factory('Utilities', Utilities);
	});