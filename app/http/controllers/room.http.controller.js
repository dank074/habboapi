module.exports	= function(app, Middleware)
{
	app.post('/api/controller/room/room_info', function(req, res, next)
	{
        if(req.body.room_id == undefined || null) return res.status(400).send({errors: true, error: 'invalid_room'}).end();

        return HabboAPI.Controllers.Room.room_info(req.body.room_id)

        .then(function resolve(room_info)
        {
            return res.status(200).send({errors: false, error: null, room_info: room_info}).end();
        },
        
        function reject(err)
        {
            return res.status(400).send({errors: true, error: err.message}).end();
        });
	});
};