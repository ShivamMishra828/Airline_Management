const express = require("express");
const airplaneRoutes = require("./airplane-route");

const router = express.Router();

router.use("/airplanes", airplaneRoutes);

module.exports = router;
