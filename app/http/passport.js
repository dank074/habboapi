
	var LocalStrategy   = require('passport-local').Strategy;

	module.exports = function(app, passport)
    {
        passport.serializeUser(function(user, done)
        {
            return done(null, user);
        });
        
        passport.deserializeUser(function(user, done)
        {
            return HabboAPI.Services.User.user_info(user.user_id)

            .then(function resolve(user_info)
            {
                user.user_info = user_info;

                return done(null, user);
            },

            function reject(err)
            {
                return done(null, false);
            });
        });
        
        passport.use('login', new LocalStrategy({
            usernameField: 'user_name',
            passwordField: 'user_pass',
            passReqToCallback: true
        },
        
        function(req, user_name, user_pass, done)
        {
            return HabboAPI.Services.Authentication.login(user_name, user_pass, req.ip, req.headers['user-agent'])

            .then(function resolve(session)
            {
                if(session == null) return done(null, false);

                return done(null, {
                    user_id: session.user_id,
                    user_name: session.user_name,
                    user_session: session.user_session
                });
            },
            
            function reject(err)
            {
                return done(null, false);
            });
        }));

        app.use(passport.initialize());
	    app.use(passport.session());
    };