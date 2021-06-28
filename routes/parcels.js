import express from 'express';
const router = express.Router();

import isAuthenticated from '../middlewares/auth.js';
import {
  parcel_get_all,
  parcel_get_user_history,
  parcel_post_send,
  parcel_patch_receive,
} from '../controllers/parcels.js';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Parcel:
 *      type: object
 *      required:
 *        - item
 *        - toUser
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the parcel
 *        item:
 *          type: string
 *          description: The name of the parcel
 *        toUser:
 *          type: string
 *          description: The email of the parcel
 *      example:
 *        id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        item: Electronics
 *        fromUser: johndoe@gmail.com
 *        toUser: lenalee@gmail.com
 *        sendDate: Jun 28, 2021 7:44 PM
 *        deliveryDate: " "
 *        status: pending
 *        remarks: " "
 */

/**
 * @swagger
 * tags:
 *  name: Parcels
 *  description: These routes are meant to send, receive and view history of all parcels. You have to be authenticated to do any of the above, apart from viewing all parcels which was considered as test for the route. The recipient can add a comment after receiving the parcel, which can be seen by the sender.
 */

/**
 * @swagger
 * /api/parcel:
 *  get:
 *    summary: Return list of all parcels
 *    description: Doesn’t need authentication. This is to test and retrieve a list of currently available parcels, to aid in further crud operations
 *    tags: [Parcels]
 *    responses:
 *      200:
 *        description: The list of all parcels
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Parcel'
 *      500:
 *        description: Something went wrong
 */

// get all parcels
router.get('/', parcel_get_all);

/**
 * @swagger
 * /api/parcel/history:
 *  get:
 *    summary: Fetch sent and received parcels.
 *    description: Needs authentication, and only the logged in history can be retrieved
 *    tags: [Parcels]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK. The list of all parcels
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Parcel'
 *      401:
 *        description: Authorization information is missing or invalid
 *      404:
 *        description: Email already registered
 */

// history of user's sent & received parcels
router.get('/history', isAuthenticated, parcel_get_user_history);

/**
 * @swagger
 * /api/parcel/send:
 *  post:
 *    summary: Send parcel
 *    tags: [Parcels]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              item:
 *                type: string
 *                example: mechandise
 *              toUser:
 *                type: string
 *                example: mosesdaa@gmail.com
 *    responses:
 *      200:
 *        description: OK. Parcel successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Parcel'
 *      400:
 *        description: Cannot send parcel to self
 *      401:
 *        description: Authorization information is missing or invalid
 */

// send a parcel || add a parcel
router.post('/send', isAuthenticated, parcel_post_send);

/**
 * @swagger
 * /api/parcel/receive/{id}:
 *  patch:
 *    summary: Receive parcel
 *    tags: [Parcels]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The parcel id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              isDelivered:
 *                type: boolean
 *                enum:
 *                  - true
 *                  - false
 *              remarks:
 *                type: string
 *                example: Delivered on time
 *    responses:
 *      200:
 *        description: OK. Parcel successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Parcel'
 *      400:
 *        description: ID is missing in the URI || Cannot send parcel to self || Product not found (wrong id)
 *      401:
 *        description: Authorization information is missing or invalid
 */

// receive a parcel || mark as delivered
router.patch('/receive/:id', isAuthenticated, parcel_patch_receive);

export default router;
