import __dirname from "../dirname.js";
import cartsService from "../services/carts.service.js";
import WSresponse from "../libs/WSresponse.js";
import mailer from "../utils/mailer.js";
import twilioClient from "../utils/twilioClient.js";
import config from "../config.js";
import logger from "../utils/logger.js";

const userInfo = (req, res, next)=>{
  req.userInfo = req.isAuthenticated()
? {
    avatar: req.user.avatar,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    address: req.user.address,
    tel: req.user.tel
  }
: {
    avatar:
      "https://olhardigital.com.br/uploads/acervo_imagens/2017/06/20170609141843_660_420.jpg",
    email: null,
    firstName: "anonimo",
    lastName: "",
    role: "invitado",
    address: "",
    tel: ""
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

const newOrder = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(400).json(new WSresponse(null, 'Debes iniciar sesión para realizar pedidos', true));

  const idCart = req.user.currentCart;
  const order = await cartsService.getById(idCart);

  if (!order.productos) return res.status(400).json(new WSresponse(null, 'No se pueden enviar ordenes vacías!', true));

  //Envío de mail con los datos del nuevo pedido.
  const mailOptions = {
    from: 'Proyecto backend | Server Node.js',
    to: config.TEST_MAIL,
    subject: `Nuevo pedido de ${req.user.firstName} (${req.user.email})`,
    html: `<h1 style="color: yellow;"> ¡NUEVO PEDIDO RECIBIDO! </h1>
    <h3 style="color: blue"> Datos del USUARIO </h3>
    <p>Email: ${req.user.email}</p>
    <p>Nombre: ${req.user.firstName} ${req.user.lastName}</p>
    <p>Tel: ${req.user.tel}</p>
    <br>
    <h3 style="color: blue"> Datos de FACTURACION Y ENVIO </h3>
    <p>ID de carrito: ${idCart}</p>
    <p>${JSON.stringify(req.body, null, 2)}</p>
    <br>
    <h2 style="color: blue"> Productos en la orden </h2>
    <ul>
      ${order.productos.map(prod =>{
        return `<li>Nombre: ${prod.nombre} | Codigo: ${prod.codigo} | Precio unitario: ${prod.precio} | Cantidad: ${prod.quantity} | Total: ${prod.precio * prod.quantity}</li>`
      }).join("")}
    </ul>
    <p>TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)}</p>
    `
  }

  //Envio de WhatsApp a admin con la informacion del pedido.
  const wspOptions = {
    body: `Nuevo pedido de ${req.user.firstName} (${req.user.email})

    *Datos del USUARIO*:
    -Email: ${req.user.email}
    -Nombre: ${req.user.firstName} ${req.user.lastName}
    -Tel: ${req.user.tel}

    *Datos de FACTURACION Y ENVIO*
    -ID de carrito: ${idCart}
    ${JSON.stringify(req.body, null, 2)}

    *Productos en la orden*
      ${order.productos.map(prod =>{
        return `- Nombre: ${prod.nombre} | Codigo: ${prod.codigo} | Precio unitario: ${prod.precio} | Cantidad: ${prod.quantity} | Total: ${prod.precio * prod.quantity}`
      }).join("\n")}

    *TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.precio * act.quantity, 0)}*
    `,
    from: `whatsapp:${config.twilioWhatsappFrom}`,
    to: `whatsapp:${config.twilioWhatsappTo}`
  }

  //Envio de SMS al cliente (Con twilio en version de prueba solo se puede enviara numeros verificados... Por eso no se pasa el del cliente como deberia ser).
  const smsOptions = {
    body: `Hola, ${req.user.firstName}. Su pedido #${idCart} ha sido recibido y se encuentra en proceso.`,
    from: config.twilioSMSFrom,
    to: config.twilioSMSTo //`+54${req.body.fac_tel || req.user.tel}`
  }

  try {
      await mailer.sendMail(mailOptions);
      await twilioClient.messages.create(wspOptions);
      await twilioClient.messages.create(smsOptions);
  } catch (error) {
      logger.warn(error);
  }

  //Borro carrito.
  await cartsService.deleteById(idCart, req.user._id);
  
  res.status(201).json(new WSresponse(idCart, "Orden enviada, espere a ser contactado por alguno de nuestros agentes de ventas!"));
};

export default {
  getTienda,
  getCarrito,
  getCheckout,
  getDetalle,
  userInfo,
  newOrder
};
