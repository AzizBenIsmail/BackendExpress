var express = require('express');
var router = express.Router();
const osController = require('../controllers/osController')
/* GET home page. */
router.get('/getOsInfomation', osController.getOsInfomation );
router.get('/osCpus', osController.osCpus );
router.get('/osCpusById', osController.osCpusById );


module.exports = router;
