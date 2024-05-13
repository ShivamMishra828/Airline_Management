const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createFlight(req, res) {
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
        });
        return res
            .status(StatusCodes.CREATED)
            .json(
                new SuccessResponse(
                    flight,
                    "Successfully created a new flight object."
                )
            );
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(new ErrorResponse(error, "Can't create a new Flight Object"));
    }
}

async function getAllFlights(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    flights,
                    "Successfully fetched data of all flights."
                )
            );
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(error, "Can't fetch data of Flight Object")
            );
    }
}

async function getFlightById(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    flight,
                    "Successfully fetched data of flight"
                )
            );
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(error, "Can't fetch data of Flight Object")
            );
    }
}

async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec,
        });
        return res
            .status(StatusCodes.OK)
            .json(
                new SuccessResponse(
                    response,
                    "Successfully updated data of seats"
                )
            );
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ErrorResponse(error, "Can't fetch data of Flight Object")
            );
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateSeats,
};
