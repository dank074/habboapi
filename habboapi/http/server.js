import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import ejs from 'ejs';
import ApiPassport from './passport/passport';
import HttpRouter from './router';

export default class HttpServer
{
    constructor()
    {
        const app           = express();
        const MySQLStore    = require('express-mysql-session')(session);

        const sessionStore  = new MySQLStore({
            host: __config.database.connection.host,
            port: __config.database.connection.port,
            user: __config.database.connection.user,
            password: __config.database.connection.password,
            database: __config.database.connection.database,
            createDatabaseTable: false,
            schema: {
                tableName: __config.session.store.tableName,
                columnNames: {
                    session_id: __config.session.store.sessionId,
                    expires: __config.session.store.expires,
                    data: __config.session.store.data
                }
            }
        });

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use(session({
            key: __config.session.key,
            secret: __config.session.secret,
            store: sessionStore,
            resave: __config.session.resave,
            saveUninitialized: __config.session.saveUninitialized
        }));

        app.engine('html', ejs.renderFile);
        app.set('view engine', 'html');

        ApiPassport(passport);
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(express.static(__base + '/dist'));
        app.use('/assets', express.static(__base + '/assets'));

        app.use(new HttpRouter);

        return app;
    }
}