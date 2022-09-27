import { Router } from "express";
import logoutController from "../controllers/logout.controller.js";

const router = Router();

router.get("/", logoutController.getLogout);

export default router;