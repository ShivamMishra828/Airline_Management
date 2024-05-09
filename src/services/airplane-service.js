const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "Airplane with given Model Number is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "Something went wrong while creating a new airplane object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirplaneByID(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airplane with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while fetching airplane object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError(
            "Something went wrong while fetching airplane object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateAirplane(id, data) {
    try {
        const airplane = await airplaneRepository.update(id, data);
        if (airplane[0] == 0) {
            throw new AppError(
                "Can't update the given airplane object",
                StatusCodes.BAD_REQUEST
            );
        }
        return airplane;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "Airplane with given Model Number is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airplane with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while updating airplane object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airplane with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while deleting airplane object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createAirplane,
    getAirplaneByID,
    getAllAirplanes,
    updateAirplane,
    deleteAirplane,
};
