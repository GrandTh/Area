const areaCtrl = require('./controllers/area-ctrl')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('dotenv').config();
const launch_bot = require('./Bot_Discord/launch_bot');

const db = require('./db')
const userRouter = require('./routes/user-router')
const userServices = require('./routes/services-router')

const app = express()
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "http://localhost:8081",
		credentials: true,
  })
);
app.use(
	session({
		secret: "secretcode",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(cookieParser("secretcode"));

//Enable passport
app.use(passport.initialize());
app.use(passport.session());

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

areaCtrl.loop_area();

app.use('/api', userRouter)
app.use('/services', userServices)
app.get('/about.json', (req, res) => {
    req;
    res.status(200).json(JSON.stringify(
		{
        "client": {
            "host": "10.101.53.35"
        },
        "server": {
            "current_time": Date.now(),
            "services": [{
                "name": 'Discord',
                "reactions": [{
                    "name": 'Send message',
                    "description": 'Send a discord message'
                }]
            }, {
                "name": 'Facebook',
                "reactions": [{
                    "name": 'Send message',
                    "description": 'Send a facebook message'
                }]
            }, {
                "name": 'ClashOfClan',
                "actions" : [{
                    "name": 'New friend',
                    "description": 'New friend in the clan'
                }, {
                    "name": 'Friend left the clan',
                    "description": 'A friend left the clan'
                }]
            }, {
                "name": 'ClashOfRoyale',
                "actions" : [{
                    "name": 'New friend',
                    "description": 'New friend in the clan'
                }, {
                    "name": 'Friend left the clan',
                    "description": 'A friend left the clan'
                }]
            }, {
                "name": 'News',
                "actions" : [{
                    "name": 'New article',
                    "description": 'New article'
                }, {
                    "name": 'New blog',
                    "description": 'New blog'
                }, {
                    "name": 'New report',
                    "description": 'New report'
                }]
            }, {
                "name": 'Coincap',
                "actions" : [{
                    "name": 'Bitcoin',
                    "description": 'bitcoin is over'
                }, {
                    "name": 'Ethereum',
                    "description": 'ethereum is over'
                }, {
                    "name": 'Tezos',
                    "description": 'tezos is over'
                }, {
                    "name": 'Vechain',
                    "description": 'vechain is over'
                }]
            }]
        }
    }));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

launch_bot.launch_bot();
