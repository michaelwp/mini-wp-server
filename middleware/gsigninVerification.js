const {OAuth2Client} = require('google-auth-library');
const googleId = process.env.googleClientId;
const client = new OAuth2Client(googleId);

const gSignInVerification = (req, res, next) => {
    let token = req.params.googleToken;

    if (!token) {
        throw "you don't have the authorization to do this action";
    }

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: googleId
        });
        const payload = ticket.getPayload();
        if (payload.email_verified) {
            req.email = payload.email;
            req.name = payload.name;
            next();
        } else {
            throw "you don't have the authorization to do this action";
        }
    }

    verify().catch(err =>
        next("you don't have the authorization to do this action")
    )
};

module.exports = gSignInVerification;