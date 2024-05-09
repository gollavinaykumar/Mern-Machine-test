import { Router } from "express";
import { checkUser } from "../controllers/Login";

const router = Router();
router.post("/", checkUser);

export default router;
