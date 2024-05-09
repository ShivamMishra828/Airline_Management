const express = require("express");
const airplaneRoutes = require("./airplane-route");
const cityRoutes = require("./city-route");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);
router.use("/cities", cityRoutes);

module.exports = router;
