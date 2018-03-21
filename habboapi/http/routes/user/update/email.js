import HotelUser from '../../../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.body.password == undefined || null || req.body.email == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return HotelUser.updateHotelUserEmail(req.user.id, req.body.password, req.body.email)

    .then(() =>
    {
        req.user.habbo.mail = req.body.email;
        
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