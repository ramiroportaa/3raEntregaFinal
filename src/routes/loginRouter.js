import { Router } from "express";
import passport from "passport";
import loginController from "../controllers/loginController.js";

const router = Router();

router.get("/", loginController.getLogin);
router.post("/", passport.authenticate("login", {failureRedirect: "/login/error"}), loginController.postLogin);

router.get("/error", (req, res)=> res.render("error.ejs", {error: "Invalid credentials"}));

export default router;