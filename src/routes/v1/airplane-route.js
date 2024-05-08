const express = require("express");
const { AirplaneMiddleware } = require("../../middlewares");
const { AirplaneController } = require("../../controllers");

const router = express.Router();

router.post(
    "/",
    AirplaneMiddleware.validateAirplaneIncomingRequest,
    AirplaneController.createAirplane
);
router.get("/", AirplaneController.getAllAirplanes);
router.get("/:id", AirplaneController.getAirplaneByID);
router.patch("/:id", AirplaneController.updateAirplane);
router.delete("/:id", AirplaneController.deleteAirplane);

module.exports = router;
