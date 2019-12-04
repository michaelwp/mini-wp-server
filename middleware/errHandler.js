const errHandler = (err, req, res, next) => {
    res.json({message: err});
    next();
};

module.exports = errHandler;