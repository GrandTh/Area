const Service = require('../models/services-model');
const User = require('../models/user-model');
const reactions_func = new Map()
const sgMail = require('@sendgrid/mail')
const discord = require('../Bot_Discord/launch_bot')

sendmail = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    const SENDGRID_API_KEY = "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"
    sgMail.setApiKey(SENDGRID_API_KEY)


    User.findOne({ username: _username }, (err, user) => {
        const msg = {
            to: user.email,
            from: "corentin.mazabrard@epitech.eu",
            subject: _subject,
            text:_text
          }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        }).catch((error) => {
            console.error(error)
        })
    }).clone().catch(err => console.log(err))

    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

sendDiscordClashRoyale = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    discord.send_to_specific('clash-royale', _text);
    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

sendDiscordClashOfClans = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    discord.send_to_specific('clash-of-clan', _text)
    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

sendDiscordNews = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    discord.send_to_specific('news', _text)

    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

sendDiscordCoincap = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    discord.send_to_specific('coincap', _text)

    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

sendDiscordWeather = (_username, _subject, _text, service_action, action, input, service_reaction, reaction) => {
    discord.send_to_specific('weather', _text)

    if (service_action === "CoinCap" || service_action === "Weather") {
        Service.findOne({ username: _username })
        .then((service) => {
            if (service) {
                service.areas.forEach((element, index) => {
                    if (element.service_action === service_action && element.action === action && element.service_reaction === service_reaction &&
                        element.reaction === reaction &&
                        element.input === input)
                        service.areas.splice(index, 1);
                })
                service.save(function (err) {
                    if (err)
                        console.log(err);
                    console.log({success: true, message: 'Area successfully deleted'})
                })
            }
        })
        .catch((err) => {
            if (err) throw err;
        });
    }
}

reactions_func.set("Send mail", sendmail)
reactions_func.set("send a discord message to clash-of-clan", sendDiscordClashRoyale)
reactions_func.set("send a discord message to clash-royale", sendDiscordClashOfClans)
reactions_func.set("send a discord message to news", sendDiscordNews)
reactions_func.set("send a discord message to coincap", sendDiscordCoincap)
reactions_func.set("send a discord message to weather", sendDiscordWeather)

module.exports = {
    reactions_func,
}
