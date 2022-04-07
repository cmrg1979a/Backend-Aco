import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setInvoiceAdmin,
  putPro,
  getInvoiceAdmin,
  delPro,
  getRegularizar,
  paymentInvoiceAdmin,
  getVerInvoiceAdmin,
  setUpdateInvoiceAdmin,
} from "../controllers/modulesPays.controller";

router.post("/setInvoiceAdmin", TokenValidation, setInvoiceAdmin);
router.post("/putPro", TokenValidation, putPro);
router.post("/getInvoiceAdmin", TokenValidation, getInvoiceAdmin);
router.post("/delPro", TokenValidation, delPro);
router.post("/getRegularizar", TokenValidation, getRegularizar);
router.post("/paymentInvoiceAdmin/:id", TokenValidation, paymentInvoiceAdmin);
router.get("/getVerInvoiceAdmin/:id", TokenValidation, getVerInvoiceAdmin);
router.put(
  "/setUpdateInvoiceAdmin",
  TokenValidation,
  setUpdateInvoiceAdmin
);

export default router;
