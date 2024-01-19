const router = require("express").Router();
const clientController = require("../controllers/clientController");

router.get("/products", clientController.getProducts);
router.get("/customers", clientController.getCustomers);

module.exports = router;
