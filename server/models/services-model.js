const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Services = new Schema(
    {
        username: {
            type: String,
        },
        subscribedToDiscord: {
            type: Boolean,
            default: 0
        },
        subscribedToNews: {
            type: Boolean,
            default: 0
        },
        subscribedToCoinCap: {
            type: Boolean,
            default: 0
        },
        subscribedToWeather: {
            type: Boolean,
            default: 0
        },
        subscribedToClashRoyale: {
            type: Boolean,
            default: 0
        },
        subscribedToClashOfClans: {
            type: Boolean,
            default: 0
        },
        subscribedToFacebook: {
            type: Boolean,
            default: 0
        },
        subscribedToWeather: {
            type: Boolean,
            default: 0
        },
        services: {
            type: Array
        },
        areas: {
            type: Array
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('services', Services)
