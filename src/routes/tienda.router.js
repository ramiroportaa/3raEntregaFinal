import { Router } from "express";
import tiendaController from "../controllers/tienda.controller.js";

const router = Router();

router.use(tiendaController.userInfo);

router.get("/", tiendaController.getTienda);
router.get("/carrito", tiendaController.getCarrito);
router.get("/detalle", tiendaController.getDetalle);
router.get("/checkout", tiendaController.getCheckout);
router.post("/checkout/newOrder", tiendaController.newOrder);


export default router;