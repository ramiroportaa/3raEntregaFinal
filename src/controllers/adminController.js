const getPanel = (req, res)=>{
    res.render("admin.ejs", {avatar: req.user.avatar, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role});
}

const getProducts = (req, res)=>{
    res.render("admin-productos.ejs", {avatar: req.user.avatar, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role});
}

const getForm = (req, res)=>{
    res.render("admin-form.ejs", {avatar: req.user.avatar, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, role: req.user.role});
}

export default {
    getPanel,
    getProducts,
    getForm
}