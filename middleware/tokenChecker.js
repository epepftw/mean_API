const checkToken = (req, res, next) => {
    if (req.headers['authorization']) {
        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        

        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = checkToken;