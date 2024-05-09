import express from "express";
import loginRoutes from "../backend/routes/LoginRoutes";
import signupRoutes from "../backend/routes/SignupRoutes";
import createRoutes from "../backend/routes/createRoutes";
import getEmployeesRoutes from "../backend/routes/getEmployeesRoutes";
import editEmployee from "../backend/routes/editEmployee";
const app = express();
const cors = require("cors");
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use("/new", createRoutes);
app.use("/employees", getEmployeesRoutes);
app.use("/employees/:id", editEmployee);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
