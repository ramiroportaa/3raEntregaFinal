import __dirname from "../utils.js";
import {cartsModel} from "../models/index.js";
import mailer from "../services/mailer.js";
import twilioClient from "../services/twilioClient.js";
import config from "../config.js";

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
  if (!req.isAuthenticated()) return res.status(400).json('Debes iniciar sesión para realizar pedidos');

  const idCart = req.user.currentCart;
  const order = (await cartsModel.getById(idCart)).data;

  if (!order.productos) return res.status(400).json('No se pueden enviar ordenes vacías!');

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
        return `<li>Nombre: ${prod.data.nombre} | Codigo: ${prod.data.codigo} | Precio unitario: ${prod.data.precio} | Cantidad: ${prod.quantity} | Total: ${prod.data.precio * prod.quantity}</li>`
      }).join("")}
    </ul>
    <p>TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.data.precio * act.quantity, 0)}</p>
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
        return `- Nombre: ${prod.data.nombre} | Codigo: ${prod.data.codigo} | Precio unitario: ${prod.data.precio} | Cantidad: ${prod.quantity} | Total: ${prod.data.precio * prod.quantity}`
      }).join("\n")}

    *TOTAL DE LA ORDEN: ${order.productos.reduce((acc, act) => acc + act.data.precio * act.quantity, 0)}*
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
      console.log(error);
  }

  //Borrar carrito y actualizar currentCart de user? O lo hago desde el front?

  res.status(201).json({idCart, message: "Orden enviada, espere a ser contactado por alguno de nuestros agentes de ventas!"});
};

export default {
  getTienda,
  getCarrito,
  getCheckout,
  getDetalle,
  userInfo,
  newOrder
};
