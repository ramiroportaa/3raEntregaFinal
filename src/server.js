import express from "express";
import __dirname from "./utils.js";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import adminRouter from "./routes/adminRouter.js";
import config from "./config.js";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

//Config de motor EJS
app.set("views", __dirname + "/views");
app.set("view engine", ".ejs");

//Config de sessions almacenadas en mongo ATLAS.
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
app.use(session({
    store: mongoStore.create({mongoUrl: config.MONGO_URL, mongoOptions}),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie:{
        maxAge: 600000
    }
}));

//Inicializacion de passport
app.use(passport.initialize());
app.use(passport.session());

//Rutas de la API
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

app.use("/admin", adminRouter);

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);

app.use((req, res)=>{ res.status(404).json({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}) });

const server = app.listen(config.PORT, ()=> console.log(`Server listening on port: ${config.PORT}`));
server.on("error", err => console.log(`Oh no! Something is broken on the server: ${err}`));