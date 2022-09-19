import { Router } from "express";
import adminController from "../controllers/adminController.js";

const router = Router();

//Mid de AUTENTICACION Y AUTORIZACION PARA ACCEDER A RUTAS DE ADMIN.
router.use((req, res, next)=>{
    if (!req.isAuthenticated()) return res.redirect("/login");
    if (req.user.role != "admin") return res.render("error.ejs", {error: "Debes tener rol de administrador para acceder"});
    next();
});

router.get("/", adminController.getPanel);
router.get("/productos", adminController.getProducts);
router.get("/productos/new", adminController.getForm);


export default router;