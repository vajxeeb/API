
const express = require('express')
const router = express.Router()
const num6 = require('../controllers/report.num6.controller')

router.get('/report/num6/get/:brance_id',num6.get)

module.exports = router