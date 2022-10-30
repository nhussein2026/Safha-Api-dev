var express = require('express');
var router = express.Router();
const controller  = require('./controller')

/* GET users listing. */

router.get('/', controller.index)


router.post('/', controller.store)

// router.get('/:id', controller.show)
router.delete('/:id', controller.destroy)
// router.put('/:id', controller.update)

module.exports = router;