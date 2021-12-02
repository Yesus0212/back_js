const express = require('express');
const koderController = require('../controllers/koder.controller')

const router = express.Router()

router.get('/', koderController.getKoder);
router.post('/', koderController.setKoder);
router.delete('/:id', koderController.deleteKoder);

module.exports = router;