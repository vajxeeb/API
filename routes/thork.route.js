
const express = require('express')

const router = express.Router()

const thork  = require('../controllers/thork.controller')

/**
 * @swagger
 * tags:
 *  name: thork
 *  description: Thork managing API
 */ 

/**
 * @swagger
 * components:
 *  schemas:
 *   thork:
 *    type: object
 *    required:
 *      - lottery_id
 *      - installment_id
 *      - user_id
 *      - thork_date
 *      - thork_by_transfer
 *      - thork_by_cash
 *    properties:
 *     thork_id:
 *      type: integer
 *      description: Auto_increment id of thork
 *     lottery_id:
 *      type: string
 *      description: Lottery id
 *     installment_id:
 *      type: string
 *      description: installment id
 *     user_id:
 *      type: integer
 *      description: User id
 *     thork_date:
 *      type: date
 *      description: Thork date
 *     thork_by_transfer:
 *      type: integer
 *      description: thork_by_transfer
 *     thork_by_cash:
 *      type: integer
 *      description: thork_by_cash
 *    example:
 *      lottery_id: 2234
 *      installment_id: 4
 *      user_id: 2
 *      thork_date: 2020-3-4
 *      thork_by_transfer: 2345
 *      thork_by_cash: 0
 */

/**
 * @swagger
 * /thork:
 *  post:
 *   summary: Create a new thork
 *   tags: [thork]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/thork'
 *   responses:
 *    200:
 *     description: The thork was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/thork'
 *    500:
 *     description: Some server error
 */
router.post('/thork',thork.create_by_one)
/**
 * @swagger
 * /thork/{thork_id}:
 *   delete:
 *     summary: Delete the thork by id
 *     tags: [thork]
 *     parameters:
 *       - in: path
 *         name: thork_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: thork id
 *     responses:
 *        200:
 *          description: The thork was deleted
 *        404:
 *          description: The thork was not found
 *         
 */
router.delete('/thork/:thork_id',thork.delete)

/**
 * @swagger
 * /thork/{brance_id}:
 *  get:
 *   summary: get all thork
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: string
 *      required: true
 *      description: brance id
 *   tags: [thork]
 *   responses:
 *    200:
 */
router.get('/thork/:brance_id',thork.get)

router.put('/thork',thork.update_by_one)
module.exports = router