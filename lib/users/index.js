var express = require('express');
var router = express.Router();
const controller = require('./controller')
var isAuthenticated = require('../../middlewares/isAuthenticated')
var isAuthorized = require('../../middlewares/isAuthorized');

/* GET users listing. */
router.post('/signup', controller.SignUp)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.delete('/:id',isAuthenticated,isAuthorized, controller.destroy)
router.put('/:id',isAuthenticated, isAuthorized, controller.update)
router.post('/login', controller.login)


module.exports = router;