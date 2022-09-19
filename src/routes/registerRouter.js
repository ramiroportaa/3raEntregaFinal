import { Router } from "express";
import registerController from "../controllers/registerController.js";
import __dirname from "../utils.js";
import multer from "multer";

const makeRandomString = (length = 8) => {
    return Math.random().toString(16).substring(2, length);
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname + "/public/uploads");
    },
    filename: (req, file, cb)=>{
        cb(null, `avatar-${req.body.firstName}-${makeRandomString()}-${file.originalname}`);
    }
});
const upload = multer({storage});

const router = Router();

router.get("/", registerController.getRegister);
router.post("/", upload.single("avatar"), (req, res, next)=>{
    const file = req.file;
    if (!file) return res.status(400).json('Error al subir archivo de imagen (avatar)');
    next();
}, registerController.postRegister);

export default router;