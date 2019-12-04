const router = require('express').Router();
const controllerAuthor = require('../controllers/controllerAuthor');

//view authors
router.get('/', controllerAuthor.viewAuthor);
//create authors
router.post('/', controllerAuthor.createAuthor);

module.exports = router;