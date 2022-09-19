const getLogout = (req, res)=>{
    if (req.isAuthenticated()){
        const name = req.user.firstName;
        req.logout({}, err => err && console.log(err));
        return res.render("logout.ejs", {name})
    };

    res.redirect("/login");
}

export default {getLogout};