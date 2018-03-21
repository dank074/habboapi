import Hotel from '../../../hotel';

module.exports = (req, res, next) =>
{
    if(req.body.id == undefined || null)
    {
        res.locals = {
            status: 400,
            errors: true,
            error: 'invalid_room'
        };

        return next();
    }

    return Hotel.Room.loadRoomInfo(req.body.id)

    .then((roomInfo) =>
    {
        res.locals = {
            roomInfo: roomInfo
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