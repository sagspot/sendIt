import express from 'express';
const router = express.Router();

import isAuthenticated from '../middlewares/auth.js';
import {
  users_get_all,
  users_post_register,
  users_post_login,
  users_post_delete,
} from '../controllers/users.js';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        name:
 *          type: string
 *          description: The name of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        sent:
 *          type: array
 *          items:
 *            required:
 *              - item
 *            properties:
 *              id:
 *                type: string
 *                description: Auto-generated id of the parcel
 *              item:
 *                type: string
 *                description: Name of parcel
 *              date:
 *                type: string
 *                description: Date of sending parcel
 *              recipient:
 *                type: array
 *                items:
 *                  required:
 *                    - email
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: Recipient's ID
 *                    name:
 *                      type: string
 *                      description: Recipient's name
 *                    email:
 *                      type: string
 *                      description: Recipient's email
 *                    status:
 *                      type: string
 *                      description: Delivery status of the parcel
 *                    date:
 *                      type: string
 *                      description: Date of delivery
 *                    remarks:
 *                      type: string
 *                      description: Recipient's remarks
 *        received:
 *          type: array
 *          items:
 *            required:
 *              - status
 *            properties:
 *              id:
 *                type: string
 *                description: ID of parcel
 *              item:
 *                type: string
 *                description: Name of parcel
 *              status:
 *                type: string
 *                description: Delivery status of the parcel
 *              date:
 *                type: string
 *                description: Date of delivery
 *              remarks:
 *                type: string
 *                description: Remarks
 *              sender:
 *                type: array
 *                items:
 *                  properties:
 *                    id:
 *                      type: string
 *                      description: Sender's ID
 *                    name:
 *                      type: string
 *                      description: Sender's name
 *                    email:
 *                      type: string
 *                      description: Sender's email
 *                    date:
 *                      type: string
 *                      description: Date parcel was sent
 *      example:
 *        id: 437ff7a5-a318-42bb-ab92-1142a9e7f518
 *        name: John Doe
 *        email: johndoe@gmail.com
 *        sent: []
 *        received: []
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Create, get, update and delete users from these routes. You have to be authenticated to delete a user, and you can only delete the authenticated user, not other users
 */

/**
 * @swagger
 * /api:
 *  get:
 *    summary: Return list of all users
 *    description: Fetch all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: The list of all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

router.get('/', users_get_all);

/**
 * @swagger
 * /api/register:
 *  post:
 *    summary: Add new user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Collins Aman
 *              email:
 *                type: string
 *                example: collo@mail.com
 *              password:
 *                type: string
 *                example: 1212
 *    responses:
 *      200:
 *        description: User successfully added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: Email already registered
 */

router.post('/register', users_post_register);

/**
 * @swagger
 * /api/login:
 *  post:
 *    summary: Login user.
 *    description: Email and password have to match those in database to login.
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: johndoe@gmail.com
 *              password:
 *                type: string
 *                example: 1234
 *    responses:
 *      200:
 *        description: Auth successfull
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Incorrect username or password
 */

router.post('/login', users_post_login);

/**
 * @swagger
 * /api:
 *  delete:
 *    summary: Delete user.
 *    description: Login and delete user. Can only delete currently authenticated user (delete self).
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      204:
 *        description: No content returned
 *      401:
 *        description: User is not logged in
 *      400:
 *        description: Something went wrong
 */

router.delete('/', isAuthenticated, users_post_delete);

export default router;
