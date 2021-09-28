
const express = require('express')

const router = express.Router()

const lottery_sell = require('../controllers/report_lottery_sell.control')

/**
 * @swagger
 * tags:
 *  name: lottery
 *  description: the lottery managing API
 */

/**
 * @swagger
 * /lottery/sell/{brance_id}/{installment}/{unit}:
 *  get:
 *   summary: get lottery selling
 *   description: get lottery selling
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The id of brance
 *      exmaple: 3
 *    - in: path
 *      name: installment
 *      schema:
 *       type: string
 *      required: true
 *      description: The installment
 *      exmaple: 4023
 *    - in: path
 *      name: unit
 *      schema:
 *       type: string
 *      required: true
 *      description: The unit
 *      exmaple: 3
 *   tags: [lottery]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Nof found
 */
router.get('/lottery/sell/:brance_id/:installment/:unit',lottery_sell.get)

module.exports = router