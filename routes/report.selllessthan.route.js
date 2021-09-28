const express = require('express')

const router = express.Router()

const selllessthan = require('../controllers/report.selllessthan.controller')

router.get('/report/sellless/get/:brance_id/:intallment',selllessthan.get_all_in_installment)
router.get('/report/sellless/get/:brance_id/:installment/:unit',selllessthan.get_all_in_installment_by_unit)

module.exports = router