import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import {
  sendParcelValidation,
  receiveParcelValidation,
} from '../middlewares/validation.js';
import parcels from '../model/parcels.js';

export const parcel_get_all = (req, res) => res.send(parcels);

export const parcel_get_user_history = (req, res) => {
  const sentParcels = parcels.filter(
    (parcel) => parcel.fromUser == req.user.email
  );
  try {
    const receivedParcels = parcels.filter(
      (parcel) => parcel.toUser == req.user.email
    );
    return res.json({ sentParcels, receivedParcels });
  } catch (err) {
    return res.status(500).send('Something went wrong');
  }
};

export const parcel_post_send = (req, res) => {
  // Validate parcel
  const { error } = sendParcelValidation(req.body);
  if (error) return res.status(400).send(error.details.message);

  if (req.user.email == req.body.toUser.toLowerCase())
    return res.status(400).send('Cannot send parcel to self');

  const newParcel = {
    id: uuidv4(),
    item: req.body.item,
    fromUser: req.user.email,
    toUser: req.body.toUser.toLowerCase(),
    sendDate: moment().format('lll'),
    deliveryDate: '',
    status: 'pending',
    remarks: '',
  };

  try {
    parcels.push(newParcel);
    return res.status(201).send(newParcel);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const parcel_patch_receive = (req, res) => {
  if (!req.params.id) return res.status(400).send('ID is missing in the URI');

  // Validate parcel
  const { error } = receiveParcelValidation(req.body);
  if (error) return res.status(400).send(error.details.message);

  // list all user's received item
  const receivedParcels = parcels.filter(
    (parcel) => parcel.toUser == req.user.email
  );

  try {
    // find the specific item from received items
    const receivedParcel = receivedParcels.filter(
      (parcel) => parcel.id == req.params.id
    );

    const [deliveredParcel] = receivedParcel;

    (deliveredParcel.deliveryDate = moment().format('lll')),
      (deliveredParcel.status =
        req.body.isDelivered == true ? 'delivered' : 'pending'),
      (deliveredParcel.remarks = req.body.remarks ? req.body.remarks : '');

    return res.status(200).send(deliveredParcel);
  } catch (err) {
    return res.status(400).send('product not found');
  }
};
