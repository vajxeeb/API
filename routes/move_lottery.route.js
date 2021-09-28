
const express = require('express')

const router  = express.Router()

const move = require('../controllers/move_lottery.controller')

/**
 * @swagger
 * tags:
 *  name: move lottery
 *  description: the lottery managing API
 */ 


/**
 * @swagger
 * components:
 *  schemas:
 *   move:
 *    type: object
 *    required:
 *      - lottery_id
 *      - unit_id
 *    properties:
 *     lottery_id:
 *      type: string
 *      description: lottery id
 *     unit_id:
 *      type: integer
 *      description: unit id 
 *    example:
 *      lottery_id: 2234
 *      unit_id: 2
 */
   
/**
 * @swagger
 * /move_lottery:
 *  put:
 *   summary: Move lottery to new unit
 *   tags: [move lottery]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/move'
 *   responses:
 *     200:
 *       description: Movelottery was sucessfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/move'
 *     400:
 *       description: The lottery was not found
 *     500:
 *       description: Some error happened
 */
router.put('/move_lottery',move.move_lottery)

module.exports = router