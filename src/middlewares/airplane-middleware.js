const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

async function validateAirplaneIncomingRequest(req, res, next) {
    if (!req.body.modelNumber) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(
                new ErrorResponse(
                    new AppError(
                        "Model Number is required",
                        StatusCodes.BAD_REQUEST
                    )
                )
            );
    }

    next();
}

module.exports = {
    validateAirplaneIncomingRequest,
};
