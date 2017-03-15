import { Socket } from 'net';

class rCRONService
{
    constructor()
    {
        const client = new Socket();
    }

    send_message(message)
    {
        return new Promise((resolve, reject) =>
        {
            if(message == null) return reject(new Error('invalid_paramemters'));

            client.connect(__config.rCRON.socket_port, __config.rCRON.socket_ip, () =>
            {
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
}

export default rCRONService;