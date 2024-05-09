const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(
                new SuccessResponse(
                    city,
                    "Successfully created a new city object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getCityByID(req, res) {
    try {
        const city = await CityService.getCityByID(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    city,
                    "Successfully fetched city object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getAllCities(req, res) {
    try {
        const cities = await CityService.getAllCities();
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    cities,
                    "Successfully fetched all city object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.params.id, {
            name: req.body.name,
        });
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    city,
                    "Successfully updated city object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function deleteCity(req, res) {
    try {
        const city = await CityService.deleteCity(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    city,
                    "Successfully deleted city object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

module.exports = {
    createCity,
    getCityByID,
    getAllCities,
    updateCity,
    deleteCity,
};
