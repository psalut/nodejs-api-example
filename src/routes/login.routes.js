import { Router } from "express";
const { logIn, consultarCPE } = require('../controllers/login.controller');

const router = Router();

// router.get("/", languageController.logIn);
router.get("/login", logIn);
router.get("/cpe", consultarCPE);
export default router;