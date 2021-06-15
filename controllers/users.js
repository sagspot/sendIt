const users = require('../model/users');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const { registerValidation } = require('../middlewares/validation');

exports.users_get_all = (req, res) => res.send(users);

exports.users_post_register = async (req, res) => {
  // Validate user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check is email exists
  const emailExist = await users.some(
    (person) => person.email == req.body.email
  );
  if (emailExist) return res.status(400).send('Email already registered');

  // create user
  const user = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    await users.push(user);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.users_post_login = async (req, res) => {
  const emailExist = await users.some(
    (person) => person.email == req.body.email
  );
  if (!emailExist) return res.status(400).send('Email not found');

  const user = await users.filter((person) => person.email == req.body.email);

  const [person] = user;

  if (req.body.password !== person.password)
    return res.status(400).send('Invalid password');

  // Create and assign token on successful login
  const token = jwt.sign(
    { id: person.id, name: person.name, email: person.email },
    process.env.TOKEN_SECRET
  );
  res.header('auth-token', token).send(token);
};

exports.users_post_delete = (req, res) => {
  const person = users.filter((user, i) => {
    if (user.id == req.user.id) return (index = i);
  });
  try {
    users.splice(index, 1);
    res.status(200).send({ msg: 'User deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
};
