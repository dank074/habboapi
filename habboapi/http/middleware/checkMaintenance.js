module.exports = (req, res, next) =>
{
    if(__config.webSettings.maintenanceEnabled == false) return next();

    if(__config.maintenanceAllowedIps.indexOf(req.ip) != -1) return next();

    let variables = {
        siteName: __config.webSettings.siteName,
        maintenanceHeader: __translation.generic.headers.maintenance,
        maintenanceMessage: __translation.generic.messages.maintenance
    };
    
    return res.status(503).render(__base + '/src/views/guest/maintenance.html', variables);
}