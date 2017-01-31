
	define(['app'], function(app)
	{
		function RankNameFilter()
		{
			return function(input)
            {
                if(input == 10) return 'Owner';

                return 'Not owner';
            };
        };

		app.filter('appRankName', RankNameFilter);
	});