import express from 'express';
const router = express.Router();

import isAuthenticated from '../middlewares/auth.js';
import {
  parcel_get_all,
  parcel_get_user_history,
  parcel_post_send,
  parcel_patch_receive,
} from '../controllers/parcels.js';

// get all parcels
router.get('/', parcel_get_all);

// history of user's sent & received parcels
router.get('/history', isAuthenticated, parcel_get_user_history);

// send a parcel || add a parcel
router.post('/send', isAuthenticated, parcel_post_send);

// receive a parcel || mark as delivered
router.patch('/receive/:id', isAuthenticated, parcel_patch_receive);

export default router;
