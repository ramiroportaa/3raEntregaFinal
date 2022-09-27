import WSresponse from "../libs/WSresponse.js";

//Mid de AUTENTICACION.
const auth = (req, res, next)=>{
    if (req.isAuthenticated()) return next();
    return res.status(401).json(new WSresponse(null, 'Debes iniciar sesión para comprar', true, -1));
};

//Es dueño del carrito que esta tratando de acceder?
const ownerCartAuth = (req, res, next)=>{
    if (req.params.id == req.user.currentCart) return next();
    return res.status(401).json(new WSresponse(null, 'No eres el dueño del carrito', true, -1));
};

const adminAuth = (req, res, next)=>{
    if (req.isAuthenticated()){
        const role = req.user.role;
        if (role === "admin") return next();
    }
    return res.status(401).json(new WSresponse(null, `ruta ${req.originalUrl} método ${req.method} no autorizada`, true, -1));
};

const multerFileValidator = (req, res, next)=>{
    const file = req.file;
    if (!file) return res.status(400).json(new WSresponse(null, 'Error al subir archivo de imagen (avatar)', true));
    next();
}

export {
    auth,
    ownerCartAuth,
    adminAuth,
    multerFileValidator
}