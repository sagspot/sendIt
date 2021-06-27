import express from 'express';
const router = express.Router();

import isAuthenticated from '../middlewares/auth.js';
import {
  users_get_all,
  users_post_register,
  users_post_login,
  users_post_delete,
} from '../controllers/users.js';

router.get('/', users_get_all);

router.post('/register', users_post_register);

router.post('/login', users_post_login);

router.delete('/', isAuthenticated, users_post_delete);

export default router;
