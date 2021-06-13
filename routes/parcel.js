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
  const newParcel = {
    id: uuid.v4(),
    item: req.body.item,
    date: moment().format('lll'),
    recipient: {
      id: 12,
      name: req.body.recipient.name,
      email: req.body.recipient.email,
      status: 'pending',
      date: '',
      remarks: '',
    },
  };
  try {
    sender[0].sent.push(newParcel);
  } catch (error) {
    res.status(400).json({
      msg: `Please include an item and a recepient`,
      errorMsg: `${error}`,
    });
  }

  res.send(sender[0].sent);
});

// receive parcel || mark parcel as delivered
router.patch('/status/:userid/:itemid', (req, res) => {
  const recipient = users.filter((user) => user.id == req.params.userid);

  recipient.filter((items) => {
    let item = items.received.filter(({ id }) => id == req.params.itemid);

    try {
      (item[0].status = req.body.status),
        (item[0].date = moment().format('lll')),
        (item[0].remarks = req.body.remarks);

      res.send(item);
    } catch (error) {
      res
        .status(400)
        .json({ msg: `Cannot process your request`, errorMsg: `${error}` });
    }
  });
});

module.exports = router;
