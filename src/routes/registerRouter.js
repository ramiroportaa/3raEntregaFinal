import { Router } from "express";
import registerController from "../controllers/registerController.js";

const router = Router();

router.get("/", registerController.getRegister);
router.post("/", registerController.postRegister);

export default router;