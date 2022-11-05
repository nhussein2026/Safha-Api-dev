var express = require('express');
var router = express.Router();
const controller  = require('./controller')

/* GET users listing. */
router.post('/', controller.store)
router.get('/', controller.index)
router.get('/:id', controller.show)
router.put('/:id', controller.destroy)
router.put('/edit/:id', controller.update)

module.exports = router;