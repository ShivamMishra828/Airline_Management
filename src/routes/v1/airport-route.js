const express = require("express");
const { AirportMiddleware } = require("../../middlewares");
const { AirportController } = require("../../controllers");

const router = express.Router();

router.post(
    "/",
    AirportMiddleware.validateAirportIncomingRequest,
    AirportController.createAirport
);
router.get("/", AirportController.getAllAirports);
router.get("/:id", AirportController.getAirportByID);
router.patch("/:id", AirportController.updateAirport);
router.delete("/:id", AirportController.deleteAirplane);

module.exports = router;
