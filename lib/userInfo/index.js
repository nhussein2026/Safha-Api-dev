var express = require('express');
var router = express.Router();
const controller  = require('./controller')
var isAuthenticated = require('../../middlewares/isAuthenticated')
var isAuthorized = require('../../middlewares/isAuthorized');

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         var ext = file.originalname.split('.')
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
//     }
// })
// const storage1 = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         var ext = file.originalname.split('.')
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
//     }
// })
// const avatar = multer({ storage: storage })
// const bgPic = multer({ storage: storage1 })

// router.post('/', isAuthenticated, isAuthorized, avatar.array('avatar', 1), bgPic.array('bgPic', 1), controller.store)

/* GET users listing. */
router.post('/',isAuthenticated, isAuthorized, controller.store)
router.get('/', controller.index)
router.get('/:id', isAuthenticated, isAuthorized,controller.show)
router.delete('/:id',isAuthenticated, isAuthorized, controller.destroy)
router.put('/:id',isAuthenticated, isAuthorized, controller.update)
module.exports = router;