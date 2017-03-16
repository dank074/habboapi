import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../database/models/user/user';
import UserService from '../services/user.service';
import AuthenticationService from '../services/authentication.service';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) =>
{
    return done(null, user);
});

passport.deserializeUser((user, done) =>
{
    return UserService.user_info(user.user_id)

    .then((user_info) =>
    {
        user.user_info = user_info;

        return done(null, user);
    })

    .catch((err) =>
    {
        return done(err, false);
    });
});

passport.use('login', new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'user_pass',
    passReqToCallback: true
},

(req, user_name, user_pass, done) =>
{
    return AuthenticationService.login(user_name, user_pass, req.ip, req.headers['user-agent'])
    
    .then((session) =>
    {
        if(session == null) return done(null, false);
        
        return done(null, {
            user_id: session.user_id,
            user_name: session.user_name,
            user_session: session.user_session
        });
    })

    .catch((err) =>
    {
        return done(err, false);
    });
}));

export default passport;