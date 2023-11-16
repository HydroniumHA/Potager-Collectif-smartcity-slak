const JWT = require('../controller/jwt');

module.exports.auth = (req, res, next) => {
    const header = req.get("Authorization");
    if(header === undefined) {
        res.sendStatus(403);
    } else {
        if(header.includes("Bearer")) {

            const token = header.substring(7);
            
            const decoded = JWT.verify(token);
            req.client = {};
            req.client.user = decoded.data.email;
            next();
        } else {
            res.sendStatus(403);
        }
    }
}