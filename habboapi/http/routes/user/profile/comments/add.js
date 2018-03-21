import Hotel from '../../../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.id == undefined || null || req.body.comment == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return Hotel.User.addProfileComment(req.body.id, req.user.id, req.body.comment)

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