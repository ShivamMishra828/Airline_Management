const { Airport, City } = require("../models");
const CrudRepository = require("./crud-repository");

class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }

    async getAllDetails() {
        const airports = await Airport.findAll({
            include: {
                model: City,
                as: "cityDetails",
            },
        });
        return airports;
    }

    async getDetailsById(id) {
        const airport = await Airport.findByPk(id, {
            include: {
                model: City,
                as: "cityDetails",
            },
        });
        return airport;
    }
}

module.exports = AirportRepository;
