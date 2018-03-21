import HotelUser from '../../../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.body.email == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }
    
    return HotelUser.validateEmail(req.body.email)

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