import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    return Hotel.Community.loadLeaderboardsInfo()

    .then((leaderboardsInfo) =>
    {
        res.locals = {
            leaderboardsInfo: leaderboardsInfo
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