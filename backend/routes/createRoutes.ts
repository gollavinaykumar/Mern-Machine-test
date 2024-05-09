import { Router } from "express";

import { createEmployee } from "../controllers/createEmployee";

const router = Router();
router.post("/",createEmployee);

export default router;