import express from "express";
import { OrderController } from "./order.controller";
const router = express.Router();

router.post("/", OrderController.createNewOrder);
router.get("/", OrderController.getAllOrder);

export const orderRoute = router;
