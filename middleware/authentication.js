const jwt = require('jsonwebtoken');

const authenticationToken = (req, res, next) => {
    if (!req.headers.token) throw "You don't have the authorization to do this action !!!";
    req.token = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    next();
};

module.exports = {
    authenticationToken
};