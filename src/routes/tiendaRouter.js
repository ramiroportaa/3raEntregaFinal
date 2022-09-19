import { Router } from "express";
import tiendaController from "../controllers/tiendaController.js";

const router = Router();

router.use(tiendaController.userInfo);

router.get("/", tiendaController.getTienda);
router.get("/carrito", tiendaController.getCarrito);
router.get("/checkout", tiendaController.getCheckout);
router.get("/detalle", tiendaController.getDetalle);


export default router;