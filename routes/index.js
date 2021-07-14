const express = require('express')
const router = express.Router()

const users = require('./modules/users.js')

router.use('/', users)

module.exports = router
