const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const rootRouter = require('./routes');

const config = require('../config/keys');

const app = express();

// Connect to DB
mongoose.connect(config.MongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

require('../config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Routes
app.use(rootRouter);

const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
