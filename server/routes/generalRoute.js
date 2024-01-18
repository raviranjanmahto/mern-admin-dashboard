const router = require("express").Router();
const generalController = require("../controllers/generalController");

router.get("/user/:id", generalController.getUser);

module.exports = router;
