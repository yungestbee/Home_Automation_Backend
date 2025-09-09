require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
// const doorRoutes = require("./routes/door.routes");
// const lightRoutes = require("./routes/light.route");
const alertRoutes = require("./routes/alert.route");
const commandRoutes = require("./routes/command.route");
const emailRoutes = require('./routes/email.route')

const app = express();
app.use(cors());
app.use(express.json());
connectDB(); // Connect to MongoDB

// app.use("/api/door", doorRoutes);
// app.use("/api/light", lightRoutes);
app.use("/api/alert", alertRoutes);
app.use("/api/command", commandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));




