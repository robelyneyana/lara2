const { Pet, Customer } = require("../models");
const { createCrudRouter } = require("./crudHelpers");

module.exports = createCrudRouter(Pet, {
    include: [{ model: Customer }],
    searchable: ["name", "species", "breed", "gender"]
});
