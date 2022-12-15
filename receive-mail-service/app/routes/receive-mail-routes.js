const express = require('express');
const router = express.Router();
const receiveMailController = require('../controllers/ReceiveMailController');



router.get(`/`,receiveMailController.findAllSentMails);


module.exports = router;