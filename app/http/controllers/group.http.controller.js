module.exports	= function(app, Middleware)
{
	app.post('/api/controller/group/group_info', function(req, res, next)
	{
        if(req.body.group_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_group'}).end();

        return HabboAPI.Controllers.Group.group_info(req.body.group_id)

        .then(function resolve(group_info)
        {
            return res.status(200).send({errors: false, error: null, group_info: group_info}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
	});
};