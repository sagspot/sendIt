const users = require('../model/users');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const {
  registerValidation,
  loginValidation,
} = require('../middlewares/validation');

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
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
  };

  try {
    await users.push(newUser);
    res.send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.users_post_login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await users.some(
    (person) => person.email == req.body.email.toLowerCase()
  );
  if (!emailExist) return res.status(400).send('Email not found');

  const user = await users.filter(
    (person) => person.email == req.body.email.toLowerCase()
  );

  const [person] = user;

  if (req.body.password !== person.password)
    return res.status(400).send('Invalid password');

  try {
    // Create and assign token on successful login
    const token = jwt.sign(
      { id: person.id, name: person.name, email: person.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    // res.header('auth-token', token).send(token);
    res.status(200).json({ message: 'Auth successful', token });
  } catch (err) {
    res.status(401).send(err);
  }
};

exports.users_post_delete = (req, res) => {
  users.filter((user, i) => {
    if (user.id == req.user.id) return (index = i);
  });
  try {
    users.splice(index, 1);
    res.status(200).send({ msg: 'User deleted' });
  } catch (err) {
    res.status(400).send(err);
  }
};
