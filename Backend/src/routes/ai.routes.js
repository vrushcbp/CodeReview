import { Router } from "express";
import express from "express";
import getResponse from "../controller/ai.controller.js";
const app = express();
const router = Router();
app.use(express.json());

router.post("/get-response", getResponse);

export default router;
