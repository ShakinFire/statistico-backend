const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');

const User = require('../src/models/user');

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
};

const verifyCallback = async (jwtPayload, done) => {
    try {
        const user = await User.findOne({ _id: jwtPayload.sub });
        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

module.exports = (passport) => {
    const strategy = new Strategy(options, verifyCallback);

    passport.use(strategy);
};
