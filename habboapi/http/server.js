import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import glob from 'glob';
import MainRouter from './router';
import ApiPassport from './api-passport';

class HttpServer
{
    constructor()
    {
        const app = express();

        app.use(cookieParser());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(session(__config.session));
        app.use(passport.initialize());
	    app.use(passport.session());

        app.use(express.static(__base + '/dist'));
        app.use('/assets', express.static(__base + '/assets'));

        app.use('/api', new MainRouter);

        app.get('/*', (req, res, next) =>
        {
            return res.sendFile(__base + '/src/views/index.html');
        });

        return app;
    }
}

export default HttpServer;