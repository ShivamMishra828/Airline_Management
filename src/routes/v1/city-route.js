const express = require("express");
const { CityMiddleware } = require("../../middlewares");
const { CityController } = require("../../controllers");

const router = express.Router();

router.post(
    "/",
    CityMiddleware.validateCityIncomingRequest,
    CityController.createCity
);
router.get("/", CityController.getAllCities);
router.get("/:id", CityController.getCityByID);
router.patch("/:id", CityController.updateCity);
router.delete("/:id", CityController.deleteCity);

module.exports = router;
