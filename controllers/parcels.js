const uuid = require('uuid');
const moment = require('moment');

const {
  sendParcelValidation,
  receiveParcelValidation,
} = require('../middlewares/validation');
const parcels = require('../model/parcels');

exports.parcel_get_all = (req, res) => res.send(parcels);

exports.parcel_get_user_history = (req, res) => {
  const sentParcels = parcels.filter(
    (parcel) => parcel.fromUser == req.user.email
  );
  const receivedParcels = parcels.filter(
    (parcel) => parcel.toUser == req.user.email
  );
  res.json({ sentParcels, receivedParcels });
};

exports.parcel_post_send = (req, res) => {
  // Validate parcel
  const { error } = sendParcelValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.user.email == req.body.toUser)
    return res.status(400).send('Cannot send parcel to self');

  const newParcel = {
    id: uuid.v4(),
    item: req.body.item,
    fromUser: req.user.email,
    toUser: req.body.toUser,
    sendDate: moment().format('lll'),
    deliveryDate: '',
    status: '',
    remarks: '',
  };

  try {
    parcels.push(newParcel);
    res.send(newParcel);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.parcel_patch_receive = (req, res) => {
  // Validate parcel
  const { error } = receiveParcelValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // list all user's received item
  const receivedParcels = parcels.filter(
    (parcel) => parcel.toUser == req.user.email
  );

  try {
    // find the specific item from received items
    const receivedParcel = receivedParcels.filter(
      (parcel) => parcel.id == req.params.id
    );

    [deliveredParcel] = receivedParcel;

    (deliveredParcel.deliveryDate = moment().format('lll')),
      (deliveredParcel.status =
        req.body.isDelivered == true ? 'delivered' : 'pending'),
      (deliveredParcel.remarks = req.body.remarks ? req.body.remarks : '');

    res.send(deliveredParcel);
  } catch (err) {
    res.status(400).send('product not found');
  }
};
