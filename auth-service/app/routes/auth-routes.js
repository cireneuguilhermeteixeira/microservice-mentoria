const express = require("express");
const router = express.Router();
const authUserController = require("../controllers/AuthUserController");

router.post(`/signup`, authUserController.save);
router.post(`/signin`, authUserController.authentication);

router.get(`/check-auth`, authUserController.checkAuth);


module.exports = router;
