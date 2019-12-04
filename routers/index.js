const router = require('express').Router();
const articleRouter = require('./routerArticle');
const authorRouter = require('./routerAuthor');

router.use("/articles", articleRouter);
router.use("/authors", authorRouter);

module.exports = router;