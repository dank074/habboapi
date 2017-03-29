import { Socket } from 'net';

class rCRONService
{
    static send_message(message)
    {
        return new Promise((resolve, reject) =>
        {
            if(message == null) return reject(new Error('invalid_paramemters'));

            let client = new Socket();

            client.connect(__config.rCRON.socket_port, __config.rCRON.socket_ip, () =>
            {
                console.log(JSON.stringify(message));
                client.write(JSON.stringify(message));
            });
            
            client.on('data', (data) =>
            {
                client.destroy();
                return resolve(null);
            });

            client.on('error', (data) =>
            {
                return reject(new Error(data));
            })
        });
    }

    static hotel_alert(message, user_name)
    {
        return new Promise((resolve, reject) =>
        {
            if(message == null || user_name == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "hotelalert",
                "data": {
                    "message": message,
                    "username": user_name
                }
            });
        });
    }

    static forward_user(user_id, room_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null || room_id == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "forwarduser",
                "data": {
                    "user_id": user_id,
                    "room_id": room_id
                }
            });
        });
    }

    static disconnect(user_id)
    {
        return new Promise((resolve, reject) =>
        {
            if(user_id == null) return reject(new Error('invalid_paramemters'));

            return this.send_message({
                "key": "disconnect",
                "data": {
                    "id": user_id
                }
            });
        });
    }
}

export default rCRONService;