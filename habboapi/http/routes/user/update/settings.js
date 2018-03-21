import HotelUser from '../../../../hotel/user';

module.exports = (req, res, next) =>
{
    if(req.body.data == undefined || null || typeof req.body.data !== 'object')
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_parameters'
        };

        return next();
    }
    
    return HotelUser.updateHotelUserSettings(req.user.id, req.body.data)

    .then(() =>
    {
        req.user.habbo.settings.block_following = req.body.data.block_following;
        req.user.habbo.settings.block_friendrequests = req.body.data.block_friendrequests;
        req.user.habbo.settings.block_roominvites = req.body.data.block_roominvites;
        req.user.habbo.settings.ignore_bots = req.body.data.ignore_bots;
        req.user.habbo.settings.ignore_pets = req.body.data.ignore_pets;
        req.user.habbo.settings.old_chat = req.body.data.old_chat;
        
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