const uuid = require('uuid');
const moment = require('moment');

const { sendParcel } = require('../middlewares/validation');
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
  const { error } = sendParcel(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newParcel = {
    id: uuid.v4(),
    item: req.body.item,
    fromUser: req.user.email,
    toUser: req.body.email,
    sendDate: moment().format('lll'),
    deliveryDate: '',
    status: '',
    remarks: '',
  };

  parcels.push(newParcel);

  res.send(newParcel);
};

exports.parcel_patch_receive = (req, res) => {
  // list all user's received item
  const receivedParcels = parcels.filter(
    (parcel) => parcel.toUser == req.user.email
  );

  // find the specific item from received items
  const receivedParcel = receivedParcels.filter(
    (parcel) => parcel.id == req.params.id
  );

  [deliveredParcel] = receivedParcel;

  (deliveredParcel.deliveryDate = moment().format('lll')),
    (deliveredParcel.status = 'delivered'),
    (deliveredParcel.remarks = req.body.remarks);

  res.send(deliveredParcel);
};
