const express = require("express");

function asyncHandler(handler) {
    return (req, res, next) =>
        Promise.resolve(handler(req, res, next)).catch(next);
}

function createCrudRouter(Model, options = {}) {
    const router = express.Router();
    const { include = [], searchable = [] } = options;

    router.get("/", asyncHandler(async (req, res) => {
        const where = {};
        if (req.query.search && searchable.length) {
            const { Op } = require("sequelize");
            where[Op.or] = searchable.map((field) => ({
                [field]: { [Op.like]: `%${req.query.search}%` }
            }));
        }
        const rows = await Model.findAll({
            where,
            include,
            order: [["id", "DESC"]]
        });
        res.json(rows);
    }));

    router.get("/:id", asyncHandler(async (req, res) => {
        const row = await Model.findByPk(req.params.id, { include });
        if (!row) return res.status(404).json({ message: "Record not found." });
        res.json(row);
    }));

    router.post("/", asyncHandler(async (req, res) => {
        const row = await Model.create(req.body);
        const created = await Model.findByPk(row.id, { include });
        res.status(201).json(created);
    }));

    router.put("/:id", asyncHandler(async (req, res) => {
        const row = await Model.findByPk(req.params.id);
        if (!row) return res.status(404).json({ message: "Record not found." });
        await row.update(req.body);
        const updated = await Model.findByPk(row.id, { include });
        res.json(updated);
    }));

    router.delete("/:id", asyncHandler(async (req, res) => {
        const row = await Model.findByPk(req.params.id);
        if (!row) return res.status(404).json({ message: "Record not found." });
        await row.destroy();
        res.json({ message: "Record deleted successfully." });
    }));

    return router;
}

function errorHandler(err, req, res, next) {
    console.error(err);
    const status = err.name === "SequelizeForeignKeyConstraintError" ? 409
        : err.name && err.name.startsWith("Sequelize") ? 400 : 500;
    res.status(status).json({
        message: status === 409
            ? "This record is connected to other records. Remove or reassign those records first."
            : err.message || "An unexpected server error occurred."
    });
}

module.exports = { createCrudRouter, errorHandler };
