const { Treatment, Appointment } = require("../models");
const { createCrudRouter } = require("./crudHelpers");

module.exports = createCrudRouter(Treatment, {
    include: [{ model: Appointment }],
    searchable: ["name", "description"]
});
