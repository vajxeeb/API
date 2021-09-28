
const express = require('express')

const router = express.Router()

const persent = require('../controllers/persent.controller')

/**
 * @swagger
 * tags:
 *  name: persent
 *  description: the persent managing API
 */ 

/**
 * @swagger
 * components:
 *  schemas:
 *   persent:
 *    type: object
 *    required:
 *      - persent_id
 *      - persent_type
 *      - persent
 *    properties:
 *     persent_id:
 *      type: string
 *      description: Persent Id
 *     persent_type:
 *      type: string
 *      description: Persent type
 *     persent:
 *      type: integer
 *      description: Persent
 *    example:
 *      persent_id: PM1
 *      persent_type: xxx
 *      persent: 20
 */

/**
 * @swagger
 * /persent:
 *  post:
 *   summary: Create a new persent
 *   tags: [persent]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/persent'
 *   responses:
 *    200:
 *     description: The persent was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/persent'
 *    500:
 *     description: Some server error
 */
router.post('/persent',persent.createpersent)
/**
 * @swagger
 * /persent:
 *  put:
 *   summary: Update the persent by id
 *   tags: [persent]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/persent'
 *   responses:
 *     200:
 *       description: The persent was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/persent'
 *     400:
 *       description: The persent was not found
 *     500:
 *       description: Some error happened
 */
router.put('/persent',persent.updatepersent)
/**
 * @swagger
 * /persent:
 *  get:
 *   summary: get all persent
 *   tags: [persent]
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/persent'
 * 
 */
router.get('/persent',persent.getallpersent)

module.exports = router