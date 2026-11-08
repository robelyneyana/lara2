const { Appointment, Customer, Pet, Veterinarian, Treatment } = require("../models");
const { createCrudRouter } = require("./crudHelpers");

module.exports = createCrudRouter(Appointment, {
    include: [
        { model: Customer },
        { model: Pet },
        { model: Veterinarian },
        { model: Treatment }
    ],
    searchable: ["status", "reason"]
});
