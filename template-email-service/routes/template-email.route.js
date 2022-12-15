const express = require("express");

const router = express.Router();
const templateEmailController = require("../controllers/template-email.controller");


router.post(`/`, templateEmailController.create);
router.get(`/`,templateEmailController.findAllTemplates);


module.exports = router;