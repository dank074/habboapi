import HotelUser from '../../../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.body.password == undefined || null || req.body.passwordNew == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return HotelUser.updateHotelUserPassword(req.user.id, req.body.password, req.body.passwordNew)

    .then(() =>
    {
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