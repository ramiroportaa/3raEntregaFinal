import __dirname from "../utils.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import {usersModel} from "../models/index.js";

const isValidPassword = (password, encPassword) =>{
    const isValid = bcrypt.compareSync(password, encPassword);
    return isValid;
}

passport.use("login", new LocalStrategy(
    { usernameField: "email"},
    async (email, password, done) => {
        const user = await usersModel.getByEmail(email);

        if (!user || !isValidPassword(password, user.password)) return done(null, false);

        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});
passport.deserializeUser(async (email, done) => {
    const user = await usersModel.getByEmail(email);
    done(null, user);
});

const getLogin = (req, res)=>{
    if (req.isAuthenticated() && req.user.role == "admin") return res.redirect("/admin");
    if (req.isAuthenticated()) return res.redirect("/tienda");
    res.sendFile(__dirname + "/views/login.html");
}

const postLogin = (req, res)=>{
    if (req.user.role == "admin") return res.redirect("/admin");
    res.redirect("/tienda");
}

export default {
    getLogin,
    postLogin
}