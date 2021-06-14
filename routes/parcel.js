const express = require('express');
const uuid = require('uuid');
const moment = require('moment');
const users = require('../users');

const router = express.Router();

// get all users
router.get('/', (req, res) => res.json(users));

// get a specific user
router.get('/:id', (req, res) => {
  const found = users.some((user) => user.id == req.params.id);
  if (found) res.json(users.filter((user) => user.id == req.params.id));
  else
    res
      .status(400)
      .json({ msg: `No user with the id of ${req.params.id} found` });
});

// add a user
router.post('/', (req, res) => {
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.name,
    sent: [],
    received: [],
  };

  users.push(newUser);
  res.send(users);
});

// send parcel
router.post('/send/:userid', (req, res) => {
  const sender = users.filter((user) => user.id == req.params.userid);
  const recipient = users.filter((user) => user.email == req.body.email);

  const sentParcel = {
    id: uuid.v4(),
    item: req.body.item,
    date: moment().format('lll'),
    recipient: {
      id: recipient[0].id,
      name: recipient[0].name,
      email: recipient[0].email,
      status: 'pending',
      date: '',
      remarks: '',
    },
  };

  const receivedParcel = {
    id: sentParcel.id,
    item: sentParcel.item,
    status: sentParcel.recipient.status,
    date: sentParcel.recipient.date,
    remarks: sentParcel.recipient.remarks,
    sender: {
      id: sender[0].id,
      name: sender[0].name,
      email: sender[0].email,
      date: sentParcel.date,
    },
  };

  try {
    sender[0].sent.push(sentParcel);
    recipient[0].received.push(receivedParcel);
  } catch (error) {
    res.status(400).json({
      msg: `Please include an item and the recepient email address`,
      errorMsg: `${error}`,
    });
  }

  res.send(sender[0].sent);
});

// receive parcel || mark parcel as delivered
router.patch('/receive/:userid/:itemid', (req, res) => {
  const recipient = users.filter((user) => user.id == req.params.userid);

  recipient.filter((items) => {
    const item = items.received.filter(({ id }) => id == req.params.itemid);

    const sender = users.filter((user) => user.id == item[0].sender.id);

    try {
      item[0].status = req.body.status;
      item[0].date = moment().format('lll');
      item[0].remarks = req.body.remarks;

      sender.filter((sentItems) => {
        let sentItem = sentItems.sent.filter(({ id }) => id == item[0].id);

        sentItem[0].recipient.status = item[0].status;
        sentItem[0].recipient.date = item[0].date;
        sentItem[0].recipient.remarks = item[0].remarks;
      });

      res.send(item);
    } catch (error) {
      res
        .status(400)
        .json({ msg: `Cannot process your request`, errorMsg: `${error}` });
    }
  });
});

module.exports = router;
