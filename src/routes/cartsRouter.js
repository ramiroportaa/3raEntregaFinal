import { Router } from "express";
import cartsController from "../controllers/cartsController.js";

const router = Router();

//Mid de AUTENTICACION.
const authMiddleware = (req, res, next)=>{
    if (req.isAuthenticated()) return next();
    return res.status(401).json({ error: -1, descripcion: 'debes iniciar sesión para comprar' });
};

const isOwner = (req, res, next)=>{
    if (req.params.id == req.user.currentCart) return next();
    return res.status(401).json({ error: -1, descripcion: 'No eres el dueño del carrito' });
};

router.use(authMiddleware);

router.get("/current", cartsController.getCurrentCartId);
router.get("/:id/productos", isOwner, cartsController.getProducts);

router.post("/", cartsController.createCart);
router.post("/:id/productos", isOwner, cartsController.addProduct);

router.delete("/:id", isOwner, cartsController.deleteById);
router.delete("/:id/productos/:id_prod", isOwner, cartsController.deleteProductById);

export default router;