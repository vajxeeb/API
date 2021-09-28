
const express = require('express')
const router = express.Router()

const brance = require('../controllers/brance.controller')

//swagger name
/**
 * @swagger
 * tags:
 *  name: Brance
 *  description: the brance managing API
 */
//swagger component

/**
 * @swagger
 * components:
 *  schemas:
 *   brance:
 *    type: object
 *    required:
 *      - brance_name
 *      - brance_no
 *      - brance_address
 *    properties:
 *     brance_id:
 *      type: integer
 *      description: the auto_increment id of the brance
 *     brance_name:
 *      type: string
 *      description: The name of brance
 *     brance_no:
 *      type: string
 *      description: The no of brance
 *     brance_address:
 *      type: string
 *      description: The address of brance 
 *    example:
 *      brance_id: 4
 *      brance_name: xxx
 *      brance_no: T02
 *      brance_address: xxx xxx xxx
 */
   

//create brance swagger
/**
 * @swagger
 * /brance:
 *  post:
 *   summary: Create a new brance
 *   tags: [Brance]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/brance'
 *   responses:
 *    200:
 *     description: The brance was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/brance'
 *    500:
 *     description: Some server error
 */
router.post('/brance',brance.createbrance)

//get swagger
/**
 * @swagger
 * /brance:
 *  get:
 *   summary: get all brance
 *   tags: [Brance]
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/brance'
 * 
 */

router.get('/brance',brance.getbrance)

//update
/**
 * @swagger
 * /brance/{brance_id}:
 *  put:
 *   summary: Update the brance by id
 *   tags: [Brance]
 *   parameters:
 *       - in: path
 *         name: brance_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brance id
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/brance'
 *   responses:
 *     200:
 *       description: The brance was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/brance'
 *     400:
 *       description: The brance was not found
 *     500:
 *       description: Some error happened
 */

router.put('/brance/:brance_id',brance.updatebrance)

/**
 * @swagger
 * /brance/{brance_id}:
 *   delete:
 *     summary: Delete the brance by brance_id
 *     tags: [Brance]
 *     parameters:
 *       - in: path
 *         name: brance_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The brance id
 *     responses:
 *        200:
 *          description: The brance was deleted
 *        404:
 *          description: The brance was not found
 *         
 */

router.delete('/brance/:brance_id',brance.detelebrance)

module.exports = router