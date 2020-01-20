const {Article} = require('../models/modelArticle');

class controllerArticle {
    static viewArticle(req, res, next) {
        Article.find({
            author: req.token.userId
        }).populate(
            "author", "name"
        ).then(data => {
            if (data.length === 0) throw "Data is empty";
            res.status(200).json(data);
        }).catch(next)
    }

    static createArticle(req, res, next) {
        let path = "";
        let tags = [];

        if (req.body.tags) {
            let tagsSplit = req.body.tags.split(",");
            tagsSplit.forEach(tag => {
                tags.push(tag.trim())
            })
        }

        if (req.file) {
            path = req.file.path;
        }

        Article.create({
            title: req.body.title,
            tags: tags,
            author: req.token.userId,
            content: req.body.content,
            featured_image: path,
            created_at: Date.now()
        }).then(data => {
            res.status(201).json({
                message: "data successfully inserted",
                details: data
            });
        }).catch(next)
    }

    static findArticle(req, res, next) {
        Article.find({
            $and: [
                {
                    $or: [{
                        title: {$regex: req.params.title, $options: 'i'}
                    }, {
                        tags: {
                            $in: req.params.title
                        }
                    }]
                }, {
                    author: req.token.userId
                }
            ]
        }).populate(
            "author", "name"
        ).then(data => {
            if (data.length > 0) {
                res.status(200).json(data);
            } else {
                throw "Data is not found !!!"
            }
        }).catch(next)
    }

    static deleteArticle(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then(data => {
                if (data) {
                    res.status(200).json({
                        message: "data successfully deleted",
                        details: data
                    })
                } else {
                    throw "data not found !!!"
                }
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {
        let path = "";
        let tags = [];
        let data = {};

        if (req.body.tags) {
            let tagsSplit = req.body.tags.split(",");
            tagsSplit.forEach(tag => {
                tags.push(tag.trim())
            })
        }

        if (req.file) {
            path = req.file.path;
            data = {
                title: req.body.title,
                tags: tags,
                author: req.token.userId,
                content: req.body.content,
                featured_image: path
            }
        } else {
            if (req.body.imgFile === 'null') {
                data = {
                    title: req.body.title,
                    tags: tags,
                    author: req.token.userId,
                    content: req.body.content,
                    featured_image: null
                }
            } else {
                data = {
                    title: req.body.title,
                    tags: tags,
                    author: req.token.userId,
                    content: req.body.content,
                }
            }
        }

        Article.updateOne({
            _id: req.params.id
        }, data).then(data => {
            res.status(201).json({
                message: "data successfully updated",
                details: data
            });
        }).catch(next)
    }
}

module.exports = controllerArticle;