import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    return Hotel.Community.loadCommunityInfo()

    .then((communityInfo) =>
    {
        res.locals = {
            communityInfo: communityInfo
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