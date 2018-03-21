module.exports = (req, res, next) =>
{
    if(__config.reCAPTCHASettings.captchaEnabled == false) return next();
        
    if(req.body.reCAPTCHA == undefined || null) return res.status(400).send({errors: true, error: 'invalid_captcha', session: req.user}).end();

    let url = "https://www.google.com/recaptcha/api/siteverify?secret=" + __config.reCAPTCHASettings.secretKey + "&response=" + req.body.reCAPTCHA + "&remoteIp=" + req.ip;
    
    let request = require('request');
    
    return request(url, (err, validatorRequest, body) =>
    {
        body = JSON.parse(body);

        if(body.success) return next();

        return res.status(400).send({errors: true, error: 'invalid_captcha', session: req.user}).end();
    });
}