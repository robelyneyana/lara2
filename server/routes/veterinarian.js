const { Veterinarian } = require("../models");
const { createCrudRouter } = require("./crudHelpers");

module.exports = createCrudRouter(Veterinarian, {
    searchable: ["name", "specialization", "contactNo"]
});
