const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

// User routes
router.post('/register', UserCtrl.register)
router.post('/login', UserCtrl.loginUser)
router.get('/user', UserCtrl.getUser)
router.post('/userInfo', UserCtrl.getUserInfo)
router.put('/username', UserCtrl.updateUsername)
router.put('/email', UserCtrl.updateEmail)
router.put('/password', UserCtrl.updatePassword)
router.put('/profilePicture', UserCtrl.updateProfilePicture)
router.delete('/user', UserCtrl.deleteUser)

module.exports = router
