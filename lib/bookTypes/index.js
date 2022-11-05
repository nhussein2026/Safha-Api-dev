var express = require('express');
var router = express.Router();
const controller  = require('./controller')

/* GET users listing. */
router.post('/', controller.store)
router.get('/all', controller.index)
router.get('/:id', controller.show)
router.delete('/:id', controller.destroy)

module.exports = router;