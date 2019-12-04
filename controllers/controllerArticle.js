const {Article} = require('../models/modelArticle');

class controllerArticle {
    static viewArticle(req, res, next) {
        Article.find({})
            .populate("author", "name")
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                next(res.json({message: err}));
            })
    }

    static createArticle(req, res, next) {
        if (!req.body.title){
            throw "title must not be empty";
        }

        Article.create({
            title: req.body.title,
            category: req.body.category,
            author: req.body.author,
            content: req.body.content,
            quillContent: req.body.quillContent,
            created_at: Date.now()
        })
            .then(data => {
                res.status(200).json({
                    message: "data successfully inserted",
                    details: data
                });
            })
            .catch(err => {
                next(res.json({message: err}));
            })
    }

    static findArticle(req, res, next) {
        Article.find({
            title: {
                $regex: req.params.title, $options: 'i'
            }
        })
            .then(data => {
                if (data.length > 0) {
                    res.status(200).json(data);
                } else {
                    throw "Data is not found !!!"
                }
            })
            .catch(err => {
                next(res.json({message: err}));
            })
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
            .catch(err => {
                next(res.json({message: err}));
            })
    }
}

module.exports = controllerArticle;