import { Router } from "express";
import adminController from "../controllers/adminController.js";

const router = Router();

router.get("/", adminController.getPanel);
router.get("/productos", adminController.getProducts);
router.get("/productos/new", adminController.getForm);


export default router;