import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.targetId == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return Hotel.rCRON.stalkUser(req.user.id, req.body.targetId)

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