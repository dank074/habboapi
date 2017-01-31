
	var LocalStrategy   = require('passport-local').Strategy,
        Authentication	= require(__base + '/app/authentication/authentication');

	module.exports = function(app, passport)
    {
        passport.serializeUser(function(user, done)
        {
            return done(null, user);
        });
        
        passport.deserializeUser(function(user, done)
        {
            return done(null, user);
        });
        
        passport.use('login', new LocalStrategy({
            usernameField: 'user_name',
            passwordField: 'user_pass',
            passReqToCallback: true
        },
        
        function(req, user_name, user_pass, done)
        {
            Authentication.login(req, user_name, user_pass)

            .then(function(session)
            {
                if(session == null) return done(null, false);

                return done(null, {
                    user_id: session.user_id,
                    user_name: session.user_name,
                    user_session: session.user_session
                });
            })

            .catch(function(err)
            {
                return done(null, false);
            });
        }));

        app.use(passport.initialize());
	    app.use(passport.session());
    };