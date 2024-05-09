const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "City with given Name is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "Something went wrong while creating a new city object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getCityByID(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "City with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while fetching city object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError(
            "Something went wrong while fetching cities object.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        if (city[0] == 0) {
            throw new AppError(
                "Can't update the given city object",
                StatusCodes.BAD_REQUEST
            );
        }
        return city;
    } catch (error) {
        if (error.name == "SequelizeUniqueConstraintError") {
            throw new AppError(
                "City with given Name is already exists in database.",
                StatusCodes.BAD_REQUEST
            );
        }
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "City with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while updating City object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "City with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while deleting city object by id.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createCity,
    getCityByID,
    getAllCities,
    updateCity,
    deleteCity,
};
