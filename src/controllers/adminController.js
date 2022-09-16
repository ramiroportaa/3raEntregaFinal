import __dirname from "../utils.js";

const getPanel = (req, res)=>{
    res.sendFile(__dirname + "/views/admin.html");
}

const getProducts = (req, res)=>{
    res.sendFile(__dirname + "/views/admin-productos.html");
}

const getForm = (req, res)=>{
    res.sendFile(__dirname + "/views/admin-form.html");
}

export default {
    getPanel,
    getProducts,
    getForm
}