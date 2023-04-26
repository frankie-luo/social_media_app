const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/UserController')

router.route('/:id').get(UserControllers.getUser).put(UserControllers.updateUser).delete(UserControllers.deleteUser)

router.route('/following/:id').post(UserControllers.followUser).delete(UserControllers.unfollowUser)

module.exports = router

