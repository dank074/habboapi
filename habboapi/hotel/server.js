import tcpPortUsed from 'tcp-port-used';
import Database from '../database';

export default class HotelServer
{
    static checkOnline()
    {
        return new Promise((resolve, reject) =>
        {
            return tcpPortUsed.check(__config.emulatorSettings.port, __config.emulatorSettings.ip)
        
            .then((status) =>
            {
                if(status == false) return reject(new Error('server_offline'));

                return resolve(null);
            })

            .catch((err) =>
            {
                return reject(err);
            });
        });
    }

    static loadTotalUsersOnline()
    {
        return Database.Models.Hotel.User.User.loadTotalUsersOnline();
    }
}