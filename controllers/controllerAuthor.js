const {Author} = require('../models/modelAuthor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class controllerAuthor {
    static viewAuthor(req, res, next) {
        Author.findById(
            req.token.userId
        ).then(data => {
            res.status(200).json(data);
        }).catch(err => {
            next(err);
        })
    };

    static loginOauth(req, res, next) {
        Author.findOne({
            email: req.params.email
        }).then(data => {
            if (data) {
                let token = jwt.sign({userId: data._id}, process.env.SECRET_KEY);
                res.status(201).json({
                    message: "User successfully login",
                    token: token
                })
            }
        }).catch(err => {
            next(err);
        })
    };

    static createAuthor(req, res, next) {
        Author.create({
            name: req.body.name,
            title: req.body.title,
            email: req.body.email,
            password: req.body.password,
            profile_pic: req.body.profile_pic
        }).then(data => {
            let token = jwt.sign({userId: data._id}, process.env.SECRET_KEY);
            res.status(201).json({
                message: "data successfully created",
                token: token
            })
        }).catch(err => {
            next(err);
        })
    }

    static loginAuthor(req, res, next) {
        const errMsg = "User/ Password not found !!!";

        Author.findOne({
            email: req.body.email
        }).then(data => {
            if (!data) throw errMsg;
            let isMatchPassword = bcrypt.compareSync(req.body.password, data.password);
            if (!isMatchPassword) throw errMsg;
            let token = jwt.sign({userId: data._id}, process.env.SECRET_KEY);
            res.status(201).json({
                message: "User successfully login",
                token: token
            })
        }).catch(err => {
            next(err);
        })
    }
}

module.exports = controllerAuthor;