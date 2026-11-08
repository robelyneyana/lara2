const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to PetCare Management System API",
        status: "running",
        endpoints: [
            "/api/customer",
            "/api/pet",
            "/api/veterinarian",
            "/api/appointment",
            "/api/treatment"
        ]
    });
});

app.get("/api/health", async (req, res) => {
    try {
        await db.sequelize.authenticate();
        res.status(200).json({ status: "ok", database: "connected" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.use("/api/customer", require("./routes/customer"));
app.use("/api/pet", require("./routes/pet"));
app.use("/api/veterinarian", require("./routes/veterinarian"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/treatment", require("./routes/treatment"));
app.use(require("./routes/crudHelpers").errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "API endpoint not found." });
});

db.sequelize.sync()
    .then(() => {
        console.log("Database connected and tables synchronized.");
        app.listen(PORT, () => {
            console.log(`PetCare API running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to database:", error);
        process.exit(1);
    });
