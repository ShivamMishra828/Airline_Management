"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addConstraint("Airports", {
            name: "cityId_fk_constraint",
            type: "foreign key",
            fields: ["cityId"],
            references: {
                table: "Cities",
                field: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint(
            "Airports",
            "cityId_fk_constraint"
        );
    },
};
