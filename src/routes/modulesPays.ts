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
  getInvoiceAdminCxC,
  setInvoiceAdminCxC,
  getVerInvoiceAdminCxC,
  setUpdateInvoiceAdminCxC,
} from "../controllers/modulesPays.controller";

router.post("/setInvoiceAdmin", TokenValidation, setInvoiceAdmin);
router.post("/putPro", TokenValidation, putPro);
router.post("/getInvoiceAdmin", TokenValidation, getInvoiceAdmin);
router.post("/delPro", TokenValidation, delPro);
router.post("/getRegularizar", TokenValidation, getRegularizar);
router.post("/paymentInvoiceAdmin/:id", TokenValidation, paymentInvoiceAdmin);
router.get("/getVerInvoiceAdmin/:id", TokenValidation, getVerInvoiceAdmin);
router.put("/setUpdateInvoiceAdmin", TokenValidation, setUpdateInvoiceAdmin);
router.post("/getInvoiceAdminCxC", TokenValidation, getInvoiceAdminCxC);
router.post("/setInvoiceAdminCxC", TokenValidation, setInvoiceAdminCxC);
router.get("/getVerInvoiceAdminCxC/:id", TokenValidation, getVerInvoiceAdminCxC);
router.put(
  "/setUpdateInvoiceAdminCxC",
  TokenValidation,
  setUpdateInvoiceAdminCxC
);
export default router;
