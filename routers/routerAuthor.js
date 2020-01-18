const router = require('express').Router();
const controllerAuthor = require('../controllers/controllerAuthor');
const {authenticationToken} = require('../middleware/authentication');
const gSignInVerification = require('../middleware/gsigninVerification');

//create authors
router.post('/', controllerAuthor.createAuthor);
//login authors
router.post('/login', controllerAuthor.loginAuthor);
//login Oauth
router.post(
    '/login/oauth/:googleToken',
    gSignInVerification,
    controllerAuthor.loginOauth
);

router.use(authenticationToken);

//view authors
router.get('/', controllerAuthor.viewAuthor);

module.exports = router;