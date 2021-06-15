const router = require('express').Router();

const isAuthenticated = require('../middlewares/auth');
const parcelsController = require('../controllers/parcels');

// get all parcels
router.get('/', parcelsController.parcel_get_all);

// history of user's sent & received parcels
router.get(
  '/history',
  isAuthenticated,
  parcelsController.parcel_get_user_history
);

// send a parcel || add a parcel
router.post('/send', isAuthenticated, parcelsController.parcel_post_send);

// receive a parcel || mark as delivered
router.patch(
  '/receive/:id',
  isAuthenticated,
  parcelsController.parcel_patch_receive
);

module.exports = router;
