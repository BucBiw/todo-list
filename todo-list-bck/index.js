const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const { facebookPassportConfig } = require('./src/passport')

const PORT = 4000;
facebookPassportConfig(PORT);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/signin/facebook', passport.authenticate('facebook'));

app.get('/signin/facebook/callback', 
    passport.authenticate('facebook', {
        session: false,
        failureRedirect: 'http://localhost:3000',
    }),
    (req, res) => {
        const user = req.user;
        res.redirect(`http://localhost:3000`);
    }
);

app.listen(PORT, () => console.log(`Server Started with http://localhost:${PORT}`));