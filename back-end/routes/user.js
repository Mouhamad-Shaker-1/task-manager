const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authentication')
const upload = require("../multerConfig")

const {register, login, getUser, updateUser} = require('../controlers/user')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/user').get(authMiddleware, getUser).post(authMiddleware, upload.single('profileImage'), updateUser)

module.exports =  router