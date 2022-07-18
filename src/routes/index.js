const express = require("express");
const billRoutes = require("./bill.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "Success!" });
});
router.use("/bill", billRoutes);

module.exports = router;
