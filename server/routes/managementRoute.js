const router = require("express").Router();
const managementController = require("../controllers/managementController");

router.get("/admins", managementController.getAdmins);
router.get("/performance/:id", managementController.getUserPerformance);

module.exports = router;
