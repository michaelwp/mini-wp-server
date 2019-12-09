const router = require('express').Router();
const controllerAuthor = require('../controllers/controllerAuthor');
const {authenticationToken} = require('../middleware/authentication');

//create authors
router.post('/', controllerAuthor.createAuthor);
//login authors
router.post('/login', controllerAuthor.loginAuthor);
//login Oauth
router.post('/login/oauth/:email', controllerAuthor.loginOauth);

router.use(authenticationToken);

//view authors
router.get('/', controllerAuthor.viewAuthor);

module.exports = router;