import bcrypt from "bcrypt";
import __dirname from "../utils.js";
import usersModel from "../models/daos/usersModel.js";

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const getRegister = (req, res)=>{
    res.sendFile(__dirname + "/views/register.html");
}

const postRegister = async (req, res)=>{
    const newUser = req.body;
    newUser.password = createHash(req.body.password);
    newUser.avatar = `/uploads/${req.file.filename}`;

    const userDB = await usersModel.createUser(newUser);
    
    if (!userDB) return res.render("error.ejs", {error: "El usuario o el mail ya están registrados"});

    res.redirect("/login");
}

export default {
    getRegister,
    postRegister
}