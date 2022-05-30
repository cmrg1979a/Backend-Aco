import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setProgrammedPayment,
  ListProgrammedPayment,
  updateProgrammedPayment,
} from "../controllers/programmedPaymentController";

router.post("/setProgrammedPayment", TokenValidation, setProgrammedPayment);
router.get("/ListProgrammedPayment", TokenValidation, ListProgrammedPayment);
router.put("/updateProgrammedPayment", TokenValidation, updateProgrammedPayment);

export default router;
