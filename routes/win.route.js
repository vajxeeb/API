
const express = require('express')

const router = express.Router()

const total_win = require('../controllers/win.controller')
const upload =  require('../middlewares/upload')

router.post('/win/upload',upload.single("file"),total_win.createtotal_win)

module.exports = router