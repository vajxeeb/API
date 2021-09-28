const express = require('express')

const router = express.Router()

const unit = require('../controllers/unit.controller')
/**
 * @awagger
 * tags:
 *   name: unit
 *   description: The unit managing API
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   unit:
 *    type: object
 *    required:
 *      - brance_id
 *      - unit
 *      - unit_own
 *    properties:
 *     unit_id:
 *      type: integer
 *      description: The auto_increment id of the unit
 *     brance_id:
 *      type: integer
 *      description: The brance id
 *     unit:
 *      type: string
 *      description: The  unit
 *     unit_own:
 *      type: string
 *      description: The unit own
 *    example:
 *      unit_id: 2
 *      brance_id: 4
 *      unit: 88
 *      unit_own: tung
 */

/**
 * @swagger
 * /unit:
 *  post:
 *   summary: Create a new unit
 *   tags: [unit]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/unit'
 *   responses:
 *    200:
 *     description: The unit was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/unit'
 *    500:
 *     description: Some server error
 */
router.post('/unit',unit.create)

/**
 * @swagger
 * /unit:
 *  put:
 *   summary: Update the unit by id
 *   tags: [unit]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/unit'
 *   responses:
 *     200:
 *       description: The unit was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/unit'
 *     400:
 *       description: The unit was not found
 *     500:
 *       description: Some error happened
 */

router.put('/unit',unit.update)

/**
 * @swagger
 * /unit/{unit_id}:
 *   delete:
 *     summary: Delete the unit by unit_id
 *     tags: [unit]
 *     parameters:
 *       - in: path
 *         name: unit_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unit id
 *     responses:
 *        200:
 *          description: The unit was deleted
 *        404:
 *          description: The unit was not found
 *         
 */
router.delete('/unit/:unit_id',unit.delete)
/**
 * @swagger
 * /unit/{brance_id}:
 *  get:
 *   summary: get all unit
 *   tags: [unit]
 *   parameters:
 *    - in: path
 *      name: brance_id
 *      schema:
 *       type: integer
 *      required: true
 *      description: The id of brance
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/unit'
 * 
 */

router.get('/unit/:brance_id',unit.get)

//router.get('/unit/:brance_id/:unit_id',unit.get_by_id)

module.exports = router