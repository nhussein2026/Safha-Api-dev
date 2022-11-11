var express = require('express');
var router = express.Router();
const controller  = require('./controller');
var isAuthenticated = require('../../middlewares/isAuthenticated');
var isAuthorized = require('../../middlewares/isAuthorized');


/* GET users listing. */
router.get('/users', isAuthenticated, isAuthorized, controller.countUsers)
router.get('/books', isAuthenticated, isAuthorized, controller.countBooks)
router.get('/reviews', isAuthenticated, isAuthorized, controller.countReviews)
// router.post('/',isAuthenticated, isAuthorized, controller.store)
// // router.get('/:id', isAuthenticated, isAuthorized,controller.show)
// router.put('/:id',isAuthenticated, isAuthorized, controller.destroy)
// router.put('/edit/:id',isAuthenticated, isAuthorized, controller.update)

module.exports = router;