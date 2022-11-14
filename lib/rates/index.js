var express = require('express');
var router = express.Router();
const controller  = require('./controller');
var isAuthenticated = require('../../middlewares/isAuthenticated');
var isAuthorized = require('../../middlewares/isAuthorized');


/* GET users listing. */
// router.get('/', isAuthenticated, isAuthorized, controller.count)
router.get('/', controller.count)

module.exports = router;