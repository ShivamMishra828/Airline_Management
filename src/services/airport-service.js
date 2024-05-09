const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        if (error.name == "SequelizeForeignKeyConstraintError") {
            throw new AppError(
                "Given City id is not present in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "Airport with given data is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "Something went wrong while creating a new airport object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirportByID(id) {
    try {
        const airport = await airportRepository.getDetailsById(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airport with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while fetching airport object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllAirports() {
    try {
        const airports = await airportRepository.getAllDetails();
        return airports;
    } catch (error) {
        throw new AppError(
            "Something went wrong while fetching airport object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        if (airport[0] == 0) {
            throw new AppError(
                "Can't update the given airport object",
                StatusCodes.BAD_REQUEST
            );
        }
        return airport;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "Airport with given data is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airport with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while updating airport object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Airport with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while deleting airport object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createAirport,
    getAirportByID,
    getAllAirports,
    updateAirport,
    deleteAirport,
};
