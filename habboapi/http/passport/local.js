import {Strategy} from 'passport-local';
import AuthenticationLocal from '../../authentication/local';

exports.loginLocal = new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},

(req, username, password, done) =>
{
    return AuthenticationLocal.login(username, password, req.ip)
    
    .then((user) =>
    {
        if(user == null) return done(null, false);

        return done(null, {
            status: true,
            id: user.id,
            username: user.username
        });
    })

    .catch((err) =>
    {
        return done(err, false);
    });
});