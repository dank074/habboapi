import passport from 'passport';
import passportLocal from 'passport-local';
import Authentication from '../services/authentication/authentication';
import Permission from '../services/authentication/permission';
import User from '../services/user/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) =>
{
    return done(null, user);
});

passport.deserializeUser((user, done) =>
{
    return User.user_info(user.user_id)

    .then((user_info) =>
    {
        user.user_info = user_info;

        return Permission.permission_list(user_info.rank);
    })

    .then((permission_list) =>
    {
        user.user_permissions = permission_list;
        
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
    return Authentication.login(user_name, user_pass, req.ip, req.headers['user-agent'])
    
    .then((session) =>
    {
        if(session == null) return done(null, false);
        
        return done(null, {
            login_status: true,
            user_id: session.user_id,
            user_name: session.user_name,
            user_session: session.user_session
        });
    })

    .catch((err) =>
    {
        return done(null, false);
    });
}));

export default passport;