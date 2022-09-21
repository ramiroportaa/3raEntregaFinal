import __dirname from "./utils.js";
import config from "./config.js";

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import adminRouter from "./routes/adminRouter.js";
import tiendaRouter from "./routes/tiendaRouter.js";
import loginRouter from "./routes/loginRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import registerRouter from "./routes/registerRouter.js";

import cluster from "cluster";
import os from "os";

import logger from "./services/logger.js";

const app = express();

const isCluster = config.MODO == "CLUSTER";
const numCpus = os.cpus().length;

if (isCluster && cluster.isPrimary) {
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();
    }

    cluster.on("exit", (worker)=>{
        cluster.fork();
    })
    
}else{
    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.use(express.static(`${__dirname}/public`));

    //Config de motor EJS
    app.set("views", __dirname + "/views");
    app.set("view engine", ".ejs");

    //Config de sessions almacenadas en mongo ATLAS.
    const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    app.use(session({
        store: mongoStore.create({mongoUrl: config.URLMongo, mongoOptions}),
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
    app.use("/tienda", tiendaRouter);

    app.use("/api/productos", productsRouter);
    app.use("/api/carrito", cartsRouter);
    
    app.use((req, res)=>{ res.status(404).json({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`}) });

    //Mid de manejo de errores generales.
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    const server = app.listen(config.PORT, ()=> logger.info(`Server listening on port: ${config.PORT}`));
    server.on("error", err => logger.error(`Oh no! Something is broken on the server: ${err}`));
}