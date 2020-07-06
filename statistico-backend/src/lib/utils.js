const path = require('path');
const fs = require('fs');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const pathToKey = path.join(__dirname, '..', '..', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

const validatePassword = (plainPassword, hash) => bcrypt.compareSync(plainPassword, hash);

const issueJWT = (user) => {
    const { _id } = user;
    const expiresIn = 60;
    const payload = {
        sub: _id,
        iat: Date.now(),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn, algorithm: 'RS256' });

    return {
        token: `Bearer ${signedToken}`,
        expires: expiresIn,
    };
};

const decodeJWT = (token) => jsonwebtoken.decode(token, PRIV_KEY);

module.exports = {
    issueJWT,
    validatePassword,
    decodeJWT,
};
