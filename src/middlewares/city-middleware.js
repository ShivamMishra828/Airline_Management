const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function validateCityIncomingRequest(req, res, next) {
    if (!req.body.name) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "City Name is required",
                        StatusCodes.BAD_REQUEST
                    ),
                    "City name is not present in req.body"
                )
            );
    }

    next();
}

module.exports = {
    validateCityIncomingRequest,
};
