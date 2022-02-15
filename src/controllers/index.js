const { Router } = require('express');
const mainController = require('./main.controller');
const catalogController = require('./catalog.controller');
const basketController = require('./basket.controller');

const router = new Router();

router.use('/', mainController);
router.use('/catalog', catalogController);
router.use('/basket', basketController);

module.exports = router;