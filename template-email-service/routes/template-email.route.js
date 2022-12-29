const express = require("express");

const router = express.Router();
const templateEmailController = require("../controllers/template-email.controller");
const authMiddleware = require("../middlewares");

router.use(authMiddleware);

router.post(`/`, templateEmailController.create);
router.get(`/`,templateEmailController.findAllTemplates);


module.exports = router;