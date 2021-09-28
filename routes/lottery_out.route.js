
const express = require('express')

const router = express.Router()

const lottery_out = require('../controllers/lottery_out.controller')

/**
 * @swagger
 * tags:
 *  name: lottery out
 *  description: the lottery managing API
 */ 
/**
 * @swagger
 * components:
 *  schemas:
 *   out:
 *    type: object
 *    required:
 *      - lottery_id
 *    properties:
 *     lottery_id:
 *      type: string
 *      description: Lottery Id
 *    example:
 *      lottery_id: 2123
 */

/**
 * @swagger
 * /lottery/{lottery_id}:
 *  put:
 *   summary: Log lottery out
 *   tags: [lottery out]
 *   parameters:
 *       - in: path
 *         name: lottery_id
 *         schema:
 *           type: string
 *         required: true
 *         description: lottery_id
 *   responses:
 *     200:
 *       description: The lottery was sucessfully out
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/out'
 *     400:
 *       description: The lottery was not found
 *     500:
 *       description: Some error happened
 */
router.put('/lottery/:lottery_id',lottery_out.log_lottery_out)

module.exports = router