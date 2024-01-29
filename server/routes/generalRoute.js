const router = require("express").Router();
const generalController = require("../controllers/generalController");

router.get("/user/:id", generalController.getUser);
router.get("/dashboard", generalController.getDashboardStats);

module.exports = router;
