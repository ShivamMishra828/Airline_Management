const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch {
        if (error.name == "SequelizeValidationError") {
            throw new AppError(
                "Some validation error",
                StatusCodes.BAD_REQUEST
            );
        }
        throw new AppError(
            "Something went wrong while creating a new city object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllFlights(query) {
    try {
        const filterObj = {};
        const sort = [];

        if (query.trips) {
            [departureCity, arrivalCity] = query.trips.split("-");
            if (departureCity == arrivalCity) {
                throw new AppError(
                    "Departure City and Arrival City can't be same.",
                    StatusCodes.BAD_REQUEST
                );
            }
            filterObj.departureAirportId = departureCity;
            filterObj.arrivalAirportId = arrivalCity;
        }

        if (query.price) {
            [minPrice, maxPrice] = query.price.split("-");
            if (minPrice == maxPrice) {
                throw new AppError(
                    "Min Price and Max Price can't be same.",
                    StatusCodes.BAD_REQUEST
                );
            }
            filterObj.price = {
                [Op.between]: [minPrice, maxPrice],
            };
        }

        if (query.travellers) {
            filterObj.totalSeats = {
                [Op.gte]: query.travellers,
            };
        }

        if (query.tripDate) {
            departureDate = query.tripDate;
            filterObj.departureTime = {
                [Op.between]: [departureDate, departureDate + " 23:59:59"],
            };
        }

        if (query.sort) {
            [filterCategory, order] = query.sort.split("_");
            sort.push(filterCategory, order);
        }

        const flights = await flightRepository.getAllFlights(filterObj, sort);
        return flights;
    } catch (error) {
        console.log(error);
        if (error.statusCode == StatusCodes.BAD_REQUEST) {
            throw new AppError(error.explanation, error.statusCode);
        }
        throw new AppError(
            "Something went wrong while fetching flight object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "Flight with given id doesn't exists in database.",
                error.statusCode
            );
        }
        throw new AppError(
            "Something went wrong while fetching flight object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(
            data.flightId,
            data.seats,
            data.decr
        );
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError(
            "Something went wrong updating seats.",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats,
};
