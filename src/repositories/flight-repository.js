const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: [sort],
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: "airplaneDetails",
                },
                {
                    model: Airport,
                    required: true,
                    as: "departureAirportDetails",
                    include: [
                        {
                            model: City,
                            as: "cityDetails",
                        },
                    ],
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col("Flight.departureAirportId"),
                            "=",
                            Sequelize.col("departureAirportDetails.airportCode")
                        ),
                    },
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirportDetails",
                    include: [
                        {
                            model: City,
                            as: "cityDetails",
                        },
                    ],
                    on: {
                        col1: Sequelize.where(
                            Sequelize.col("Flight.arrivalAirportId"),
                            "=",
                            Sequelize.col("arrivalAirportDetails.airportCode")
                        ),
                    },
                },
            ],
        });
        return response;
    }
}

module.exports = FlightRepository;
