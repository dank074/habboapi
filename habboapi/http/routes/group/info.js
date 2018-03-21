import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.id == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_group'
        };

        return next();
    }

    return Hotel.Group.loadGroupInfo(req.body.id)

    .then((groupInfo) =>
    {
        res.locals = {
            groupInfo: groupInfo
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