const Service = require('../models/services-model');
const User = require('../models/user-model');
const bcrypt = require("bcryptjs");
const axios = require('axios');
const passport = require('passport')

createNewTable = (req, res) => {
    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("Service Already Exists");
        if (!doc) {
            const newService = new Service({
                username: req.body.username,
                subscribedToDicsord: req.body.subscribedToDicsord,
                subscribedToGmail: req.body.subscribedToGmail,
                subscribedToGithub: req.body.subscribedToGithub,
                subscribedToInstagram: req.body.subscribedToInstagram,
                subscribedToReddit: req.body.subscribedToReddit,
                subscribedToEpitechIntra: req.body.subscribedToEpitechIntra,
                services: req.body.services,
                areas: req.body.areas,
            });
            await newService.save();
            console.log("Table Created");
            res.send("Service Created");
        }
    });
}

servicesInfo = async (req, res) => {
    await Service.findOne({ username: req.body.username }, (err, service) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!service) {
            return res
                .status(404)
                .json({ success: false, error: `Service not found` })
        }
        return res.status(200).json({ success: true, data: service })
    }).clone().catch(err => console.log(err))
}

subscribedToDiscord = (req, res) => {
    const putservice = {
        "service": "Discord",
        "tokenType": req.body.tokenType,
        "accessToken": req.body.accessToken,
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToDiscord === false)
                doc.subscribedToDiscord = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToDiscord successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToFacebook = (req, res) => {
    const putservice = {
        "service": "Facebook",
        "tokenType": req.body.tokenType,
        "accessToken": req.body.accessToken,
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToFacebook === false)
                doc.subscribedToFacebook = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToFacebook successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToWeather = (req, res) => {
    const putservice = {
        "service": "Weather",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToWeather === false)
                doc.subscribedToWeather = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToWeather successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToCoinCap = (req, res) => {
    const putservice = {
        "service": "CoinCap",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToCoinCap === false)
                doc.subscribedToCoinCap = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToCoinCap successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToClashRoyale = (req, res) => {
    const putservice = {
        "service": "ClashRoyale",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToClashRoyale === false)
                doc.subscribedToClashRoyale = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToClashRoyale successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToClashOfClans = (req, res) => {
    const putservice = {
        "service": "ClashOfClans",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToClashOfClans === false)
                doc.subscribedToClashOfClans = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToClashOfClans successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToNews = (req, res) => {
    const putservice = {
        "service": "News",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToNews === false)
                doc.subscribedToNews = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToNews successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

subscribedToWeather = (req, res) => {
    const putservice = {
        "service": "Weather",
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            console.log(req.body.username);
            if (doc.subscribedToWeather === false)
                doc.subscribedToWeather = true;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'subscribedToWeather successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.services.splice(0, 0, putservice);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                // res.send({ success: true, message: 'Services successfully modified' })
            })
        }
        if (!doc)
            res.send("Service doesn't Exists");
    });
}

addAREA = (req, res) => {
    const putAREA = {
        "service_action": req.body.service_action,
        "action": req.body.action,
        "input": req.body.input,
        "service_reaction": req.body.service_reaction,
        "reaction": req.body.reaction,
    }

    Service.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
            doc.areas.splice(0, 0, putAREA);
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.send({ success: true, message: 'AREA successfully created' })
            })
        }
        if (!doc)
            res.send("AREA doesn't Exists");
    });
}

deleteAREA = async (req, res) => {
    Service.findOne({ username: req.body.username })
    .then((service) => {
        if (service) {
            service.areas.forEach((element, index) => {
                    if (element.service_action === req.body.service_action && element.action === req.body.action && element.service_reaction === req.body.service_reaction &&
                        element.reaction === req.body.reaction &&
                        element.input === req.body.input) {
                            service.areas.splice(index, 1);
                        }
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    res.send({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
}

module.exports = {
    createNewTable,
    subscribedToDiscord,
    subscribedToFacebook,
    subscribedToClashRoyale,
    subscribedToClashOfClans,
    subscribedToCoinCap,
    subscribedToNews,
    subscribedToWeather,
    servicesInfo,
    addAREA,
    subscribedToWeather,
    deleteAREA
}
