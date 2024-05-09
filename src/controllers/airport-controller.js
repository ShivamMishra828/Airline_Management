const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirport(req, res) {
    try {
        const airport = await AirportService.createAirport({
            airportName: req.body.name,
            airportCode: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(
                new SuccessResponse(
                    airport,
                    "Successfully created a new airport object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getAirportByID(req, res) {
    try {
        const airport = await AirportService.getAirportByID(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airport,
                    "Successfully fetched airport object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getAllAirports(req, res) {
    try {
        const airports = await AirportService.getAllAirports();
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airports,
                    "Successfully fetched all airports object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function updateAirport(req, res) {
    try {
        const updationData = {};
        if (req.body.name) {
            updationData.airportName = req.body.name;
        }
        if (req.body.code) {
            updationData.airportCode = req.body.code;
        }
        if (req.body.address) {
            updationData.address = req.body.address;
        }
        if (req.body.cityId) {
            updationData.cityId = req.body.cityId;
        }
        const airport = await AirportService.updateAirport(
            req.params.id,
            updationData
        );
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airport,
                    "Successfully updated airport object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function deleteAirplane(req, res) {
    try {
        const airport = await AirportService.deleteAirport(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airport,
                    "Successfully deleted airport object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

module.exports = {
    createAirport,
    getAirportByID,
    getAllAirports,
    updateAirport,
    deleteAirplane,
};
