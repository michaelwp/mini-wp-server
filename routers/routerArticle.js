const router = require('express').Router();
const controllerArticle = require('../controllers/controllerArticle');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const {authenticationToken} = require('../middleware/authentication');

router.use(authenticationToken);

const uploadHandler = multer({
    storage: multerGoogleStorage.storageEngine(),
    limits: {
        fileSize: 1e6 // in bytes
    }
});

// view article
router.get("/", controllerArticle.viewArticle);
// input articlers
router.post(
    "/",
    uploadHandler.single('featured_image'),
    controllerArticle.createArticle
);
// find article (by title)
router.get("/:title", controllerArticle.findArticle);
// delete article (by id)
router.delete("/:id", controllerArticle.deleteArticle);

module.exports = router;
