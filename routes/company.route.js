
const express = require('express');

const router = express.Router();

const companycontroller = require('../controllers/company.controller');

router.post('/company/create',companycontroller.createcompany);
router.get('/company/get',companycontroller.getcompany);
router.put('/company/update',companycontroller.updatecompany);


module.exports = router;