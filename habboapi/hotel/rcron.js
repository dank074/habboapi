import { Socket } from 'net';
import HotelServer from './server';

export default class HotelrCRON
{
    static sendMessage(message = null)
    {
        return new Promise((resolve, reject) =>
        {
            if(message == null) return reject(new Error('invalid_parammeters'));

            return HotelServer.checkOnline()

            .then(() =>
            {
                let client = new Socket();
                
                client.connect(__config.emulatorSettings.rCRON.port, __config.emulatorSettings.rCRON.ip, () =>
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
                    return reject(new Error('rcron_error'));
                });
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static friendRequest(id = 0, targetId = 0)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || targetId == 0 || null) return reject(new Error('invalid_paramemters'));

            return this.sendMessage({
                "key": "friendrequest",
                "data": {
                    "user_id": id,
                    "target_id": targetId
                }
            })

            .then(() =>
            {
                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static stalkUser(id = 0, targetId = 0)
    {
        return new Promise((resolve, reject) =>
        {
            if(id == 0 || null || targetId == 0 || null) return reject(new Error('invalid_paramemters'));

            return this.sendMessage({
                "key": "stalkUser",
                "data": {
                    "user_id": id,
                    "follow_id": targetId
                }
            })

            .then(() =>
            {
                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }
}