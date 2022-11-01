var express = require('express');
var router = express.Router();
const controller  = require('./controller')
const isAuthenticated = require('../../middlewares/isAuthenticated')
/* GET users listing. */


router.post('/reviews/:id',isAuthenticated, controller.reviewsLike)
router.post('/comments/:id',isAuthenticated, controller.commentsLike)



module.exports = router;