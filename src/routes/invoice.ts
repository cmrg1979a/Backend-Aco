import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();
import { getInvoicePath } from "../controllers/invoice.controller";

router.get("/list_invoice_path/:id_house/:id_proveedor", getInvoicePath);

export default router;
