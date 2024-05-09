import { Router } from "express";

import { updateEmployee } from "../controllers/EditEmployee";

const router = Router();
router.post("/", updateEmployee);

export default router;
