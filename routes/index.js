var express = require('express');
var router = express.Router();


router.use('/users',require("../lib/users"))
router.use('/reviews',require("../lib/reviews"))
router.use('/comments',require("../lib/comments"))
router.use('/categories',require("../lib/categories"))
router.use('/books',require("../lib/books"))
router.use('/userType',require("../lib/usersType"))
router.use('/userInfos',require("../lib/userInfo"))
router.use('/likes',require("../lib/likes"))
router.use('/favorites',require("../lib/favorites"))
router.use('/bookTypes',require("../lib/bookTypes"))




module.exports = router;
 