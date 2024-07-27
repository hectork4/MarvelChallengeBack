import { Router } from "express";
import { add, get, remove } from "../controller/favorites.js";

const router = Router();

router.get("/", get);

router.post("/add", add);

router.post("/remove", remove);

export default router;
