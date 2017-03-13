module.exports	= function(app, Middleware)
{
	app.post('/api/controller/profile/profile_info', function(req, res, next)
	{
        if(req.body.user_name == undefined || null) return res.status(400).send({errors: true, error: 'invalid_user'}).end();

        return HabboAPI.Controllers.Profile.profile_info(req.body.user_name)

        .then(function resolve(profile_info)
        {
            return res.status(200).send({errors: false, error: null, profile_info: profile_info}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
	});
};