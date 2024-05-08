const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(
                new SuccessResponse(
                    airplane,
                    "Successfully created a new airplane object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getAirplaneByID(req, res) {
    try {
        const airplane = await AirplaneService.getAirplaneByID(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airplane,
                    "Successfully fetched airplane object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function getAllAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAllAirplanes();
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airplanes,
                    "Successfully fetched all airplanes object."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

async function updateAirplane(req, res) {
    try {
        const updationData = {};
        if (req.body.modelNumber) {
            updationData.modelNumber = req.body.modelNumber;
        }
        if (req.body.capacity) {
            updationData.capacity = req.body.capacity;
        }
        const airplane = await AirplaneService.updateAirplane(
            req.params.id,
            updationData
        );
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airplane,
                    "Successfully updated airplane object by id."
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
        const airplane = await AirplaneService.deleteAirplane(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    airplane,
                    "Successfully deleted airplane object by id."
                )
            );
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(new ErrorResponse(error, error.explanation));
    }
}

module.exports = {
    createAirplane,
    getAirplaneByID,
    getAllAirplanes,
    updateAirplane,
    deleteAirplane,
};
