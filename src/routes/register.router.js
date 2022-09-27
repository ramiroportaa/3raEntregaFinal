import { Router } from "express";
import registerController from "../controllers/register.controller.js";
import {multerUpload} from "../utils/multerUpload.js";
import { multerFileValidator } from "../middlewares/index.js";

const router = Router();

router.get("/", registerController.getRegister);
router.post("/", multerUpload.single("avatar"), multerFileValidator, registerController.postRegister);

export default router;