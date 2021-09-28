
const express = require('express')

const router = express.Router()

const user = require('../controllers/user.controller')

/**
 * @swagger
 * tags:
 *  name: user
 *  description: User managing API
 */ 


/**
 * @swagger
 * components:
 *  schemas:
 *   user:
 *    type: object
 *    required:
 *      - user_name
 *      - user_phone
 *      - permision_id
 *      - brance_id
 *      - password
 *    properties:
 *     user_id:
 *      type: integer
 *      description: Auto_increment id of user
 *     user_name:
 *      type: string
 *      description: User name
 *     user_phone:
 *      type: string
 *      description: User phone
 *     permision_id:
 *      type: integer
 *      description: Permision id 
 *     brance_id:
 *      type: integer
 *      description: Brance id
 *     password:
 *      type: string
 *      description: User password
 *    example:
 *      user_id: 3
 *      user_name: xxx
 *      user_phone: 020xxxxxxxx
 *      permision_id: 3
 *      brance_id: 2
 *      password: 12345
 */



/**
 * @swagger
 * /user:
 *  post:
 *   summary: Create a new user
 *   tags: [user]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/user'
 *   responses:
 *    200:
 *     description: The user was successfully created
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/user'
 *    500:
 *     description: Some server error
 */
router.post('/user',user.create)

/**
 * @swagger
 * /user:
 *  put:
 *   summary: Update the user by id
 *   tags: [user]
 *   requestBody: 
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/user'
 *   responses:
 *     200:
 *       description: The user was sucessfully updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     400:
 *       description: The lottery was not found
 *     500:
 *       description: Some error happened
 */
router.put('/user',user.update)
/**
 * @swagger
 * /user/{user_id}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User id
 *     responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 *         
 */
router.delete('/user/:user_id',user.delete)
/**
 * @swagger
 * /user:
 *  get:
 *   summary: get all user
 *   tags: [user]
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/user'
 * 
 */
router.get('/user',user.get)

module.exports = router