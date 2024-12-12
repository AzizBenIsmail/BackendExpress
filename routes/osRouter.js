var express = require('express');
var router = express.Router();
const osController = require('../controllers/osController')
const logMiddleware = require('../middlewares/logMiddleware');

/* GET home page. */
router.get('/getOsInfomation',logMiddleware, osController.getOsInfomation );
router.get('/osCpus', logMiddleware,osController.osCpus );
router.get('/osCpusById',logMiddleware, osController.osCpusById );


module.exports = router;
