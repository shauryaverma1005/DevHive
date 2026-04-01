import { Router } from "express";
import {register, login, logout} from "../controllers/user.controller";
import {auth} from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth, logout);



export default router;

