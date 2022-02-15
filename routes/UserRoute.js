const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const { Validations } = require("../middleware");
const { UserValidations } = require("../validator");

router.get('/' , UserController.index)
router.get('/register' , UserController.indexRegiter)
router.post('/register',
UserValidations.SignupValidations,
Validations.handleValidationErrors,
 UserController.store),
router.post('/login',UserController.loginPost)
router.put('/:id', UserController.update)
router.delete('/', UserController.destroy)
router.get('/:id', UserController.details)

module.exports = router