import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

import users from '../model/users.js';
import {
  registerValidation,
  loginValidation,
} from '../middlewares/validation.js';

export const users_get_all = (req, res) => res.send(users);

export const users_post_register = async (req, res) => {
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
    id: uuidv4(),
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

export const users_post_login = (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = users.some(
    (person) => person.email == req.body.email.toLowerCase()
  );
  if (!emailExist)
    return res.status(400).send('Incorrect username or password');

  const user = users.filter(
    (person) => person.email == req.body.email.toLowerCase()
  );

  const [person] = user;

  if (req.body.password !== person.password)
    return res.status(400).send('Incorrect username or password');

  try {
    // Create and assign token on successful login
    const token = jwt.sign(
      { id: person.id, name: person.name, email: person.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ message: 'Auth successful', token });
  } catch (err) {
    res.status(401).send(err);
  }
};

// Not currenty working
export const users_post_delete = (req, res) => {
  users.filter((user, i) => {
    if (user.id == req.user.id) return (index = i);
  });
  try {
    users.splice(index, 1);
    res.sendstatus(204);
  } catch (err) {
    res.status(400).send(err);
  }
};
