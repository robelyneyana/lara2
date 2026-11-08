const { Customer } = require("../models");
const { createCrudRouter } = require("./crudHelpers");

module.exports = createCrudRouter(Customer, {
    searchable: ["name", "address", "contactNo"]
});
