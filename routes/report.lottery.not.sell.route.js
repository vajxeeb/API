
const express = require('express')
const router = express.Router()
const lt_not_sell = require('../controllers/report.lottery.not.sell.controller')


/**
 * @swagger
 * tags: 
 *  name: lottery
 *  description: the lottery managing API
 */

/**
 * @swagger
 * /lottery/notsell/{brance_id}/{installment}:
 *  get:
 *   summary: get lottery not sell by brance, installment and all unit
 *   description: get lottery not sell by brance, installment and all unit
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
 *   tags: [lottery]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Nof found
 */

router.get('/lottery/notsell/:brance_id/:installment',lt_not_sell.get_all_in_installment)

/**
 * @swagger
 * /lottery/notsell/{brance_id}/{installment}/{unit}:
 *  get:
 *   summary: get lottery not sell by brance, installment and  unit
 *   description: get lottery not sell by brance, installment and  unit
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
 *      description: the unit
 *      example: 80
 *   tags: [lottery]
 *   responses:
 *    200:
 *     description: Success
 *    401:
 *     description: Nof found
 */
router.get('/lottery/notsell/:brance_id/:installment/:unit',lt_not_sell.get_in_installment_by_unit)

module.exports = router