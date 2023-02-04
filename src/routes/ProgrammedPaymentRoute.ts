import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setProgrammedPayment,
  ListProgrammedPayment,
  updateProgrammedPayment,
  ListProgrammedPaymentDetails,
  deleteProgrammedPayment,
} from "../controllers/programmedPaymentController";

router.post("/setProgrammedPayment", TokenValidation, setProgrammedPayment);
router.get("/ListProgrammedPayment", TokenValidation, ListProgrammedPayment);
router.put(
  "/updateProgrammedPayment/:id",
  TokenValidation,
  updateProgrammedPayment
);
router.get(
  "/ListProgrammedPaymentDetails/:id_branch",
  TokenValidation,
  ListProgrammedPaymentDetails
);
router.put(
  "/deleteProgrammedPayment",
  TokenValidation,
  deleteProgrammedPayment
);

export default router;
