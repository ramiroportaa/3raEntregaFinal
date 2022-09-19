import __dirname from "../utils.js";

const userInfo = (req, res, next)=>{
  req.userInfo = req.isAuthenticated()
? {
    avatar: req.user.avatar,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
  }
: {
    avatar:
      "https://olhardigital.com.br/uploads/acervo_imagens/2017/06/20170609141843_660_420.jpg",
    email: null,
    firstName: "anonimo",
    lastName: "",
    role: "invitado",
  };
  next();
}

const getTienda = (req, res) => {
  res.render("tienda.ejs", req.userInfo);
};

const getCarrito = (req, res) => {
  res.render("carrito.ejs", req.userInfo);
};

const getCheckout = (req, res) => {
  res.render("checkout.ejs", req.userInfo);
};

const getDetalle = (req, res) => {
  res.render("detalle.ejs", req.userInfo);
};

export default {
  getTienda,
  getCarrito,
  getCheckout,
  getDetalle,
  userInfo
};
