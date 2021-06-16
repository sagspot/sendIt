const router = require('express').Router();

const isAuthenticated = require('../middlewares/auth');
const usersController = require('../controllers/users');

router.get('/', usersController.users_get_all);

router.post('/register', usersController.users_post_register);

router.post('/login', usersController.users_post_login);

router.delete('/', isAuthenticated, usersController.users_post_delete);

module.exports = router;
