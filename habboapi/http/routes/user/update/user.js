import HotelUser from '../../../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.body.data == undefined || null || typeof req.body.data !== 'object')
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return HotelUser.updateHotelUser(req.user.id, req.body.data)

    .then(() =>
    {
        req.user.habbo.motto = req.body.data.motto;
        
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