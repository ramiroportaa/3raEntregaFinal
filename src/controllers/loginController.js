import __dirname from "../utils.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import usersModel from "../models/daos/usersModel.js";

const isValidPassword = (password, encPassword) =>{
    const isValid = bcrypt.compareSync(password, encPassword);
    return isValid;
}

passport.use("login", new LocalStrategy(
    async (username, password, done) => {
        const user = await usersModel.getByUsername(username);

        if (!user || !isValidPassword(password, user.password)) return done(null, false);

        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
    const user = await usersModel.getByUsername(username);
    done(null, user);
});

const getLogin = (req, res)=>{
    if (req.isAuthenticated()) return res.redirect("/tienda.html"); //agregar validacion de autorizacion y redirigir a /tienda si es user o a /admin si es admin...
    res.sendFile(__dirname + "/views/login.html");
}

const postLogin = (req, res)=>{
    //Deberia pasar el html a EJS para renderear los datos del user logeado...
    res.redirect("/tienda.html"); //agregar validacion de autorizacion y redirigir a /tienda si es user o a /admin si es admin...
}

export default {
    getLogin,
    postLogin
}