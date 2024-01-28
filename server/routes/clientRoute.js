const router = require("express").Router();
const clientController = require("../controllers/clientController");

router.get("/products", clientController.getProducts);
router.get("/customers", clientController.getCustomers);
router.get("/transactions", clientController.getTransactions);
router.get("/geography", clientController.getGeography);

module.exports = router;
