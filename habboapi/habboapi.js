import http from 'http';
import https from 'https';
import fs from 'fs';
import Server from './http/server';

class HabboAPI
{
    constructor(base, config)
    {
        global.__base   = base;
        global.__config = config;

        const app = new Server;

        this.start_server(app, config.port, config.ip);
    }

    start_server(app, port, ip)
    {
        const web = http.Server(app);

        web.listen(port, ip, () =>
        {
            console.log('[HABBOAPI] HTTP Server Started ' + ip + ':' + port);
        });

        /* SSL
        const options = {
            key: fs.readFileSync('./ssl/private.pem'),
            cert: fs.readFileSync('./ssl/certificate.pem')
        };
        
        const webhttps = https.Server(app);

        webhttps.listen(port_https, ip, () =>
        {
            console.log('[HABBOAPI] HTTPS Server Started ' + ip + ':' + port_https);
        });
        */
    }
}

export default HabboAPI;