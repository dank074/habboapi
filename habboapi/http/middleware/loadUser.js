import HotelUser from '../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.isAuthenticated() == false) return next();
    
    return HotelUser.loadUserInfo(req.user.id, null)

    .then((userInfo) =>
    {
        if(userInfo == null) req.user.habbo = null;

        req.user.habbo = userInfo;

        return next();
    })

    .catch((err) =>
    {
        return res.status(400).send({errors: true, error: err.message, session: req.user}).end();
    });
}