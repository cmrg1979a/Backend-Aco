import { Router } from "express";
const router: Router = Router();
import { processPayment } from "../controllers/payment.controller";

router.post("/getPayment", processPayment);

export default router;
