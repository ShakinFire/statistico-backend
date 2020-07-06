const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const userValidator = require('../validators/user/user.validator');
const User = require('../models/user');
const { issueJWT, validatePassword } = require('../lib/utils');

const router = express.Router();

// Login page
router.get('/login', (request, response) => {
    response.send('Login');
});

// Resister page
router.get('/register', (request, response) => {
    response.send('Register');
});

router.post('/login', async (request, response) => {
    const userDocument = await User.findOne({ username: request.body.username });
    const user = userDocument.toObject();

    if (!user) {
        response.status(401).json({ message: 'Username or password were incorrect' });
    }

    const isValid = validatePassword(request.body.password, user.password);

    if (isValid) {
        const jwtToken = issueJWT(user);
        const { password, ...userWithoutPassword } = user;

        response.status(200).json({
            user: userWithoutPassword,
            token: jwtToken.token,
            expiresIn: jwtToken.expires,
        });
    } else {
        response.status(401).json({ message: 'Username or password were incorrect' });
    }
});

router.post('/register', (request, response) => {
    const { username, password } = request.body;

    try {
        userValidator.validateSync(request.body, { abortEarly: false });
    } catch (err) {
        response.status(500).json({ error: err.errors });
    }

    const userToCreate = new User({
        username,
        password,
    });

    bcrypt.hash(userToCreate.password, 10)
        .then((hash) => {
            userToCreate.password = hash;
            userToCreate.save()
                .then((user) => {
                    const jwt = issueJWT(user);
                    response.status(200).json({ user, token: jwt.token, expiresIn: jwt.expires });
                });
        });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
    // eslint-disable-next-line no-underscore-dangle
    const user = request.user._doc;
    const { password, ...userWithoutPassword } = user;

    response.status(200).json(userWithoutPassword);
});

module.exports = router;
