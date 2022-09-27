import __dirname from "./dirname.js";
import config from "./config.js";

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

import cluster from "cluster";
import os from "os";

import logger from "./utils/logger.js";

import router from "./routes/index.js";

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

    app.use(router);

    const server = app.listen(config.PORT, ()=> logger.info(`Server listening on port: ${config.PORT}`));
    server.on("error", err => logger.error(`Oh no! Something is broken on the server: ${err}`));
}