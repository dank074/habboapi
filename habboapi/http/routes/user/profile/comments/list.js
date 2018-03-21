import Hotel from '../../../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.query == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }

    return Hotel.User.loadProfileComments(req.body.query)

    .then((commentList) =>
    {
        res.locals = {
            commentList: commentList
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