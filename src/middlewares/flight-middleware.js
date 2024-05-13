const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req, res, next) {
    if (!req.body.flightNumber) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "flightNumber not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.airplaneId) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "airplaneId not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.departureAirportId) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "departureAirportId not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.arrivalAirportId) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "departureAirportId not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.arrivalTime) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "arrivalTime not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.departureTime) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "departureTime not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.price) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "price not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    if (!req.body.totalSeats) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "totalSeats not found in the oncoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    next();
}

function validateUpdateSeatsRequest(req, res, next) {
    if (!req.body.seats) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        [
                            "seats not found in the incoming request in the correct form",
                        ],
                        StatusCodes.BAD_REQUEST
                    ),
                    "Something went wrong while creating flight"
                )
            );
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest,
};
