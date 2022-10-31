var express = require('express');
var router = express.Router();
const controller  = require('./controller')
  var isAuthenticated = require('../../middlewares/isAuthenticated');
const isAuthorized = require('../../middlewares/isAuthorized');

router.get('/allAuthors', isAuthenticated, controller.index)
router.get('/', isAuthenticated , controller.show)  // get my profile 
router.delete('/' ,controller.destroy)
router.put('/', isAuthenticated, controller.update)


module.exports = router;