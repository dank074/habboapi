import http from 'http';
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
            console.log('[HABBOAPI] Started ' + ip + ':' + port);
        });
    }
}

export default HabboAPI;