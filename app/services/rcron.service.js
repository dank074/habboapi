
	var rCRON  = {},
        net    = require('net'),
        client = new net.Socket();

    rCRON.send_message = function(message)
    {
        return new Promise(function(resolve, reject)
        {
            if(message == null) return reject(new Error('invalid_paramemters'));

            client.connect(HabboAPI.Config.rCRON.socket_port, HabboAPI.Config.rCRON.socket_ip, function()
            {
                client.write(JSON.stringify(message));
            });
            
            client.on('data', function(data)
            {
                client.destroy();
                return resolve(null);
            });

            client.on('error', function(data)
            {
                return reject(new Error(data));
            })
        });
    };

    rCRON.hotel_alert = function(message, user_name)
    {
        if(message == null || user_name == null) return Promise.reject(new Error('invalid_paramemters'));

        return HabboAPI.Services.rCRON.send_message({
            "key": "hotelalert",
            "data": {
                "message": message,
                "username": user_name
            }
        });
    };

    rCRON.forward_user = function(user_id, room_id)
    {
        if(user_id == null || room_id == null) return Promise.reject(new Error('invalid_paramemters'));

        return HabboAPI.Services.rCRON.send_message({
            "key": "forwarduser",
            "data": {
                "user_id": user_id,
                "room_id": room_id
            }
        });
    };

    rCRON.disconnect = function(user_id, user_name)
    {
        if(user_id == null || user_name == null) return Promise.reject(new Error('invalid_paramemters'));

        return HabboAPI.Services.rCRON.send_message({
            "key": "disconnect",
            "data": {
                "user_id": user_id,
                "username": user_name
            }
        });
    }

	module.exports = rCRON;