import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import adminRouter from "./admin.router.js";
import tiendaRouter from "./tienda.router.js";
import loginRouter from "./login.router.js";
import logoutRouter from "./logout.router.js";
import registerRouter from "./register.router.js";
import { Router } from "express";
import { generalError, notFound } from "../middlewares/index.js";

const router = Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

router.use("/admin", adminRouter);
router.use("/tienda", tiendaRouter);

router.use("/api/productos", productsRouter);
router.use("/api/carrito", cartsRouter);

//Mid rutas no implementadas.
router.use(notFound);

//Mid de manejo de errores generales.
router.use(generalError);

export default router;
