const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const User = require('./models/user.model');
const { user } = require('./models');
const facebookPassportConfig = require('./passport/index');
const router = express.Router();

facebookPassportConfig();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongo_uri = "mongodb+srv://admin_todolist:i46NTNYm1Mvb5adh@todolist.wndkj.mongodb.net/todolist?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(
    () => {
        console.log("[success] task 2 : connected to the database ");
    },
    error => {
        console.log("[failed] task 2 " + error);
        process.exit();
    }
);

app.get('/', (req, res) => {
    res.status(200).send('<h1>Fuck Graphql</h1>');
});

app.get('/users', async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            todoList: [],
            tokenVersion: 0,
            facebookID: ""
        }, (err, user) => {
            console.log(err);
            if (err) return res.status(500).send("There was a problem registering the user.");
            const id = user._id;
            const tokenV = user.tokenVersion
            var token = jwt.sign({ id, tokenV }, 'Aaboltip', {
                expiresIn: 86400 //ใช้ได้ 24 hr
            });
            res.status(200).send({ auth: true, token: token, user: newUser }).cookie('jwt', token, { httpOnly: true });
        });
    } catch (error) {
        throw (error)
    }
});

app.post('/me', async(req, res) => {
    console.log(req.body.token)
    var token = req.body.token;

    if (!token) res.status(401).send({ auth: false, message: 'No token provided.' });
    const decodeToken = jwt.verify(token, 'Aaboltip');
    console.log(decodeToken)

    const user = await User.findById(decodeToken.id);
    if(!user) res.status(401).send({ auth: false, message: 'User not found.' });
    if(decodeToken.tokenV !== user.tokenVersion) res.status(401).send({ auth: false, message: 'User not Authenticate.' });
    console.log(user);

    res.status(200).send({ auth: true, username: user.username, email: user.email, todoList: user.todoList });

});

app.post('/login', async (req, res) => {
    const email = await req.body.email;
    if (!email) res.send('Email is Require.');

    const user = await User.findOne({ email });
    if (!user) res.send('Email Or Password is invalid');

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) res.send('Email Or Password is invalid');

    const id = user._id;
    const tokenV = user.tokenVersion;
    var token = jwt.sign({ id, tokenV }, 'Aaboltip', {
        expiresIn: 86400 //ใช้ได้ 24 hr
    });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send({ auth: true, token: token, user: user });
});

app.post('/logout', async (req, res) => {
    try {
        console.log(req.body.token);
        const token = req.body.token;
        const decodeToken = jwt.verify(token, 'Aaboltip');
        console.log(decodeToken)
        const updateTV = decodeToken.tokenV + 1;
        const user = await User.findByIdAndUpdate(decodeToken.id, {
            tokenVersion: updateTV
        });
        // user.tokenVersion = updateTV;
        await user.save();
        res.send('logout success.').clearCookie('jwt');
    } catch (error) {
        res.send(error)
    }
});

app.get('/auth/facebook', passport.authenticate('facebook', { display: 'popup' }));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false,
    failureRedirect: 'http://localhost:3000/',
    successRedirect: 'http://localhost:3000/app'
}), async (req, res) => {
    const fbuser = req.user;
    const user = await User.findOne({facebookID: fbuser.id});

    if(!user){
        const newUser = await User.creare({
            username: fbuser.displayName,
            email: "",
            password: "facebook",
            todoList: [],
            tokenVersion: 0,
            facebookID: fbuser.id
        }, (err, user) => {
            console.log(err);
            if (err) return res.status(500).send("There was a problem registering the user.");
            const id = user._id;
            const tokenV = user.tokenVersion
            var token = jwt.sign({ id, tokenV }, 'Aaboltip', {
                expiresIn: 86400 //ใช้ได้ 24 hr
            });
            res.status(200).json({auth: true, token: token});
        });
    }else{
        console.log("mongoDB:", user);
        const id = user._id;
        const tokenV = user.tokenVersion;

        var token = jwt.sign({ id, tokenV }, 'Aaboltip', {
            expiresIn: 86400 //ใช้ได้ 24 hr
        });
        res.status(200).json({ auth: true, token: token });
    }
}
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('http://localhost:3000/'); //Can fire before session is destroyed?
  });

app.use((req, res, next) => {
    var err = new Error("ไม่พบ path ที่คุณต้องการ");
    err.status = 404;
    next(err);
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("[success] task 1 : listening on port " + port));