import { Router } from "express";
import { deleteEmployee, getAllEmployees } from "../controllers/getEmployees";

const router = Router();
router.get("/", getAllEmployees);
router.delete("/", deleteEmployee);

export default router;
