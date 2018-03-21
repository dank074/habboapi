import HotelBan from '../../hotel/ban';

module.exports = (req, res, next) =>
{
    if(req.isAuthenticated() == false) return next();

    return HotelBan.checkBan(req.user.id, null)

    .then((ban) =>
    {
        req.logout();

        return res.status(423).send({errors: true, error: 'banned', ban: ban}).end();
    })

    .catch((err) =>
    {
        return next();
    });
}