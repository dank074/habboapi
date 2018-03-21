import fs from 'fs';
import http from 'http';
import https from 'https';
import jsonfile from 'jsonfile';
import HttpServer from './http/server';

export default class HabboAPI
{
    constructor()
    {
        let app     = new HttpServer();

        this.writePublicConfig();
            
        if(__config.httpsEnabled == false)
        {
            http.createServer(app).listen(__config.portHttp, __config.ip, () =>
            {
                console.log('[HABBOAPI] HTTP Server Started ' + __config.ip + ':' + __config.portHttp);
            });
        }
        else
        {
            let options = {
                key: fs.readFileSync('./ssl/private.pem'),
                cert: fs.readFileSync('./ssl/certificate.pem')
            };
    
            https.createServer(options, app).listen(__config.portHttps, __config.ip, () =>
            {
                console.log('[HABBOAPI] HTTPS Server Started ' + __config.ip + ':' + __config.portHttps);
            });
        }
    }

    writePublicConfig()
    {
        __config.webSettings.reCAPTCHASettings = {
            captchaEnabled: __config.reCAPTCHASettings.captchaEnabled,
            siteKey: __config.reCAPTCHASettings.siteKey,
        };

        __config.webSettings.client.clientHost  = __config.emulatorSettings.ip;
        __config.webSettings.client.clientPort  = __config.emulatorSettings.port;

        jsonfile.writeFile(__base + '/src/config/constants.json', __config.webSettings, (err) =>
        {
            if(err)
            {
                console.error('There was an error writing the configuration file');
                process.exitCode = 1;
            }
        });
    }
}