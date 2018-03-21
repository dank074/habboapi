import PassportAuthenticationLocal from './local';

module.exports = (passport) =>
{
    passport.serializeUser((user, done) =>
    {
        return done(null, user);
    });

    passport.deserializeUser((user, done) =>
    {
        return done(null, user);
    });

    passport.use('local-login', PassportAuthenticationLocal.loginLocal);
}