
const express = require('express')

const router = express.Router();

const installment = require('../controllers/installment.controller')

/**
 * @awagger
 * tags:
 *   name: installment
 *   description: The installment managing API
 */
/**
 * @swagger
 * components:
 *  schemas:
 *   installment:
 *    type: object
 *    required:
 *      - installment
 *    properties:
 *     installment_id:
 *      type: integer
 *      description: the auto_increment id of the installment
 *     installment:
 *      type: string
 *      description: The name of installment
 *    example:
 *      installment_id: 4
 *      installment: 4456
 */

/**
 * @swagger
 * /installment:
 *  post:
 *    summary: Create a new installment
 *    tags: [installment]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/installment'
 *    responses:
 *      200:
 *        description: The installment was created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/installment'
 *      500:
 *        description: Error
 */
router.post('/installment/create',installment.createinstallment)
router.put('/installment/update',installment.updateinstallment)
router.delete('/installment/delete',installment.deleteinstallment)
router.get('/installment/get',installment.getinstallment)
router.get('/installment/getmaxid',installment.getmaxid)
router.get('/installment/getmaxid_maxidpass1',installment.getmaxid_maxidpass1)



module.exports = router