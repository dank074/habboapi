import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    return Hotel.Server.loadTotalUsersOnline()

    .then((usersOnline) =>
    {
        res.locals = {
            usersOnline: usersOnline
        };

        return next();
    })

    .catch((err) =>
    {
        res.locals = {
            status: 400,
            errors: true,
            error: err.message
        };

        return next();
    });
}