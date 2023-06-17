const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();
const controller = new UserController();

router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));

module.exports = router;