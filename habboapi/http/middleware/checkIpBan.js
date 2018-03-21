import moment from 'moment';
import HotelBan from '../../hotel/ban';

module.exports = (req, res, next) =>
{
    return HotelBan.checkBan(0, req.ip)

    .then((ban) =>
    {
        if(req.isAuthenticated() == true) req.logout();
        
        let variables = {
            siteName: __config.webSettings.siteName,
            bannedHeader: __translation.generic.headers.banned,
            bannedMessage: __translation.generic.messages.ipBanned,
            banReason: __translation.generic.forms.banReason,
            banExpires: __translation.generic.forms.banExpires,
            ban: {
                ban_reason: ban.ban_reason,
                ban_expires: new moment(ban.ban_expire * 1000).format('MMM D, YYYY h:mm A')
            }
        };

        return res.status(403).render(__base + '/src/views/guest/ban/ip.html', variables);
    })

    .catch((err) =>
    {
        return next();
    });
}