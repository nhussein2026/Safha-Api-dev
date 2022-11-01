var express = require('express');
var router = express.Router();
const controller  = require('./controller');
var isAuthenticated = require('../../middlewares/isAuthenticated')
var isAuthorized = require('../../middlewares/isAuthorized');

/* GET users listing. */
router.post('/',isAuthenticated, isAuthorized, controller.store)
router.get('/all',isAuthenticated, isAuthorized, controller.index)
router.get('/:id', isAuthenticated, isAuthorized,controller.show)
router.delete('/:id',isAuthenticated, isAuthorized, controller.destroy)
// router.delete('/',isAuthenticated, isAuthorized, controller.destroy)


module.exports = router;