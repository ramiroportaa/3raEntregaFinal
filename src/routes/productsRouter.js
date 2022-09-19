import { Router } from "express";
import productsController from "../controllers/productsController.js";

const router = Router();

const authorizeMiddleware = (req, res, next)=>{
    if (req.isAuthenticated()){
        const role = req.user.role;
        if (role === "admin") return next();
    }
    return res.status(401).json({ error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada` });
};

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);

router.post("/", authorizeMiddleware, productsController.add);

router.put("/:id", authorizeMiddleware, productsController.updateById);

router.delete("/:id", authorizeMiddleware, productsController.deleteById);

export default router;