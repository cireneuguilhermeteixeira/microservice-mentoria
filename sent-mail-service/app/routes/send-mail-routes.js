const express = require('express');
const router = express.Router();
const sentMailController = require('../controllers/SentMailController');



router.post(`/`,sentMailController.sendMailAndRegisterHistoric);
router.get(`/`,sentMailController.findAllSentMails);


module.exports = router;