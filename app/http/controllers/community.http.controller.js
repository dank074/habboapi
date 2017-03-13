module.exports	= function(app, Middleware)
{
    app.get('/api/controller/community/community_info', function(req, res, next)
	{
        return HabboAPI.Controllers.Community.community_info()

        .then(function resolve(community_info)
        {
            return res.status(200).send({errors: false, error: null, community_info: community_info}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
	});

    app.get('/api/controller/community/staff_users', function(req, res, next)
	{
        return HabboAPI.Controllers.Community.staff_users()

        .then(function resolve(staff_users)
        {
            return res.status(200).send({errors: false, error: null, staff_users: staff_users}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
	});
};