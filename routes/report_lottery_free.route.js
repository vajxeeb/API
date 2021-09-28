
const express = require('express')

const router = express.Router()

const lottery_free = require('../controllers/report_lottery_free.controller')

//swagger name
/**
 * @swagger
 * tags:
 *  name: lottery
 *  description: the lottery managing API
 */

/**
 * @swagger
 * /lottery/free/{brance_id}:
 *  get:
 *   summary: get lottery free by brance 
 *   description: get lottery free brance
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The id of brance
 *   tags: [lottery]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/lottery/free/:brance_id',lottery_free.reportall)
/**
 * @swagger
 * /lottery/free/{brance_id}/{unit}:
 *  get:
 *   summary: get lottery free by brance and  unit
 *   description: get lottery free
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The id of brance
 *      exmaple: 3
 *    - in: path
 *      name: unit
 *      schema:
 *       type: string
 *      required: true
 *      description: The unit of unit
 *      exmaple: 3
 *   tags: [lottery]
 *   responses:
 *    200:
 *     description: Success
 */
router.get('/lottery/free/:brance_id/:unit',lottery_free.report_by_unit)

module.exports = router