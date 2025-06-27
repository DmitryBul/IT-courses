import express from "express";
import { register, login, getMe } from "../controllers/UserController.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express.Router();

router.post("/auth/register", register);

router.post("/auth/login", login);

router.get("/auth/me", checkAuth, getMe);

export default router;
