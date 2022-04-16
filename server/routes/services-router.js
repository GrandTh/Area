const express = require('express')
const passport = require('passport')

const ServicesCtrl = require('../controllers/services-ctrl')

const router = express.Router()

// Services routes
router.post('/newTable', ServicesCtrl.createNewTable)
router.post('/servicesInfo', ServicesCtrl.servicesInfo)
router.put('/subscribedToDiscord', ServicesCtrl.subscribedToDiscord)
router.put('/subscribedToFacebook', ServicesCtrl.subscribedToFacebook)
router.put('/subscribedToCoinCap', ServicesCtrl.subscribedToCoinCap)
router.put('/subscribedToWeather', ServicesCtrl.subscribedToWeather)
router.put('/subscribedToClashRoyale', ServicesCtrl.subscribedToClashRoyale)
router.put('/subscribedToClashOfClans', ServicesCtrl.subscribedToClashOfClans)
router.put('/subscribedToNews', ServicesCtrl.subscribedToNews)
router.put('/subscribedToWeather', ServicesCtrl.subscribedToWeather)
router.put('/addAREA', ServicesCtrl.addAREA)
router.delete('/deleteAREA', ServicesCtrl.deleteAREA)

module.exports = router
