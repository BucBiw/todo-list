const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const User =require('./models/user.model');
const { user } = require('./models');
const router = express.Router();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongo_uri = "mongodb+srv://admin_todolist:i46NTNYm1Mvb5adh@todolist.wndkj.mongodb.net/todolist?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
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

app.get('/users', async(req, res) => {
    const users = await User.find({});
    res.json(users);
});

app.post('/register', async(req, res) => {
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
        if(err) return res.status(500).send("There was a problem registering the user.");
        const id = user._id;
        const tokenV = user.tokenVersion
        var token = jwt.sign({id, tokenV}, 'Aaboltip', {
            expiresIn: 86400 //ใช้ได้ 24 hr
        });
        res.status(200).send({ auth: true, token: token, user: newUser }).cookie('jwt', token, { httpOnly: true });
    });
    } catch (error) {
        throw (error)
    }
});

app.post('/me', (req, res) => {
    console.log(req.body.jwt)
    var token = req.body.jwt;
    if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, 'Aaboltip', (err, decoded) => {
        if(err) return res.status(500).send({auth: false, message: 'Failed to Authenticate'});
        User.findById(decoded.id, (err, user) => {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            const id = user._id;
        const tokenV = user.tokenVersion
        var token = jwt.sign({id, tokenV}, 'Aaboltip', {
            expiresIn: 86400 //ใช้ได้ 24 hr
        });
        res.status(200).send({ auth: true, user: user });
        return res.cookie('jwt', token, { httpOnly: true });
        });
    });
});

app.post('/login', async (req, res) => {
    const email = await req.body.email;
    if(!email) res.send('Email is Require.');

    const user = await User.findOne({email});
    if(!user) res.send('Email Or Password is invalid');

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) res.send('Email Or Password is invalid');

    const id = user._id;
    const tokenV = user.tokenVersion;
    var token = jwt.sign({id, tokenV}, 'Aaboltip', {
        expiresIn: 86400 //ใช้ได้ 24 hr
    });
    res.cookie('jwt', token, { httpOnly: true });
    res.status(200).send({ auth: true, token: token, user: user });
});

app.post('/logout', async(req, res) => {
    try {
        console.log(req.body.token);
        const token = req.body.token;
        const decodeToken = jwt.verify(token, 'Aaboltip');
        const updateTV = decodeToken.tokenV + 1;
        const user = await User.findById(decodeToken.id);
        user.tokenVersion = updateTV;
        await user.save();
        res.send(user).clearCookie('jwt');
    } catch (error) {
        res.send(error)
    }
});

app.use((req, res, next) => {
    var err = new Error("ไม่พบ path ที่คุณต้องการ");
    err.status = 404;
    next(err);
  });


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("[success] task 1 : listening on port " + port) );