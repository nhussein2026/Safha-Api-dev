var express = require('express');
var router = express.Router();
const controller  = require('./controller')

var isAdmin = require('../../middlewares/isAdmin')
var isAuthenticated = require('../../middlewares/isAuthenticated');
// var isAuthorized = require('../../middlewares/isAuthorized')


/*  Admin. */
router.post('/login', controller.login) 
router.get('/all', isAuthenticated, isAdmin, controller.index)
router.get('/allusers', isAuthenticated, isAdmin, controller.indexUsers)
router.get('/', isAuthenticated, isAdmin, controller.show)
router.get('/show/:id', isAuthenticated, isAdmin, controller.showUser)
router.put('/:id', isAuthenticated, isAdmin, controller.destroy)
router.post('/', isAuthenticated, isAdmin, controller.store) 
router.put('/edit/:id', isAuthenticated, isAdmin, controller.update)
// router.get('/all', isAuthenticated, isAdmin, controller.showUsers)

// router.delete('/:id', isAuthenticated, isAuthorized, controller.destroy)
// router.put('/:id', isAuthenticated, isAuthorized, controller.update)



module.exports = router;