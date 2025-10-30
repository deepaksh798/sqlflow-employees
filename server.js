import express from "express";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Employee Management API");
});

app.use("/v1/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
