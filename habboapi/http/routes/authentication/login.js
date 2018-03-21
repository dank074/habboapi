import HotelBan from '../../../hotel/ban';

module.exports = (req, res, next) =>
{
    return HotelBan.checkBan(req.user.id, null)

    .then((ban) =>
    {
        if(req.isAuthenticated() == true) req.logout();
        
        return res.status(423).send({errors: true, error: 'banned', ban: ban}).end();
    })

    .catch((err) =>
    {
        return next();
    });    
}