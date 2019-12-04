const {Author} = require('../models/modelAuthor');

class controllerAuthor {
    static viewAuthor(req, res, next) {
        Author.find()
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(res.json({message : err}));
            })
    };

    static createAuthor(req, res, next) {
        Author.create({
            name: req.body.name,
            title: req.body.title,
            email: req.body.email,
            password: req.body.password,
            profile_pic: req.body.profile_pic
        })
            .then(data => {
                res.status(200).json({
                    message: "data successfully inserted",
                    details: data
                })
            })
            .catch(err => {
                next(res.json({message : err}));
            })
    }
}

module.exports = controllerAuthor;