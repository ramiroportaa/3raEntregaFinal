import bcrypt from "bcrypt";
import __dirname from "../dirname.js";
import mailer from "../utils/mailer.js";
import config from "../config.js";
import logger from "../utils/logger.js";
import DAOFactory from "../models/daos/DAOFactory.js";

const usersDAO = DAOFactory.createDao("user", config.DATABASE);

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

    const userDB = await usersDAO.add(newUser);
    if (!userDB) return res.render("error.ejs", {error: "El usuario o el mail ya están registrados"});

    //Envío de mail con los datos del nuevo registro.
    const mailOptions = {
        from: 'Proyecto backend | Server Node.js',
        to: config.TEST_MAIL,
        subject: 'Nuevo registro',
        html: `<h1 style="color: red;"> ¡SE REGISTRO UN NUEVO USUARIO! </h1>
        <p>Email: ${userDB.email}</p>
        <p>Role: ${userDB.role}</p>
        <p>First name: ${userDB.firstName}</p>
        <p>Last Name: ${userDB.lastName}</p>
        <p>Address: ${userDB.address}</p>
        <p>Age: ${userDB.age}</p>
        <p>Tel: ${userDB.tel}</p>
        <p>Avatar adjunto</p>
        `,
        attachments: [
            {path: __dirname + "/public" + userDB.avatar}
        ]
    }

    try {
        await mailer.sendMail(mailOptions);
    } catch (error) {
        logger.warn(error);
    }

    res.redirect("/login");
}

export default {
    getRegister,
    postRegister
}