const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function validateAirportIncomingRequest(req, res, next) {
    if (!req.body.name) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "Airport Name is required",
                        StatusCodes.BAD_REQUEST
                    ),
                    "Airport Name is not present in req.body."
                )
            );
    }

    if (!req.body.code) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "Airport Code is required",
                        StatusCodes.BAD_REQUEST
                    ),
                    "Airport Code is not present in req.body."
                )
            );
    }

    if (!req.body.cityId) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "City ID is required",
                        StatusCodes.BAD_REQUEST
                    ),
                    "City ID is not present in req.body."
                )
            );
    }

    next();
}

module.exports = {
    validateAirportIncomingRequest,
};
