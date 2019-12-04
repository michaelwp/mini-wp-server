const router = require('express').Router();
const controllerArticle = require('../controllers/controllerArticle');

// view article
router.get("/", controllerArticle.viewArticle);
// input article
router.post("/", controllerArticle.createArticle);
// find article (by title)
router.get("/:title", controllerArticle.findArticle);
// delete article (by id)
router.delete("/:id", controllerArticle.deleteArticle);

module.exports = router;
