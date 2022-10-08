const express = require('express');
const router = express.Router();
const {
  registerValidations,
  loginValidations,
} = require('../validations/userValidations');
const { register, login } = require('../controllers/usersController');
const { updateName } = require('../controllers/ProfileController');
const Authorization = require('../services/Authorization');
router.post('/register', registerValidations, register);
router.post('/login', loginValidations, login);
module.exports = router;
router.post('/updateName', Authorization.authorized, updateName);