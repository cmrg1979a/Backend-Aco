import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  setSPaymentPro,
  setSPaymentConceptos,
  getSPaymentPro,
  putSPaymentPro,
  getRequestPayment,
  setSPaymentFile,
  getRequestPaymentConceptos,
  getDebsToPay,
  getDebsToPayAdmin,
  // getAccountsReceivable,
  setInvoice,
  getListInvoice,
  getListInvoiceExp,
  delInvoice,
  // getDebsToPayFilter,
  pdfcxp,
  pdfcxc,
  pdfcxpD,
  pdfcxcD,
  setDebsClient,
  getDebsClient,
  delDebsClient,
  getDebsClientList,
  setCheckDebsClient,
  getReportAccounts,
  getReportAccountsFilter,
  getReporteCXP,
  getReporteCXC,
  getReporteCXCAdmin,
  // getReporteCXPEXCEL,
  listPagoControlGastoXProveedor,
  updateDebsClient,
  
  eliminarSpaymentpro,
} from "../controllers/spayment.controller";

router.post("/setSPaymentPro", TokenValidation, setSPaymentPro);
router.post("/setSPaymentConceptos", TokenValidation, setSPaymentConceptos);
router.post("/putSPaymentPro/:id", TokenValidation, putSPaymentPro);
router.post("/setSPaymentFile", TokenValidation, setSPaymentFile);
router.post("/getRequestPayment", TokenValidation, getRequestPayment);
router.post("/getDebsToPay", TokenValidation, getDebsToPay);
router.post("/getDebsToPayAdmin", TokenValidation, getDebsToPayAdmin);
// router.post("/getDebsToPayFilter", TokenValidation, getDebsToPayFilter);
// router.post("/getAccountsReceivable", TokenValidation, getAccountsReceivable);
router.post("/setInvoice", TokenValidation, setInvoice);
router.post("/getListInvoice", TokenValidation, getListInvoice);
router.post("/getListInvoiceExp", TokenValidation, getListInvoiceExp);
router.post("/delInvoice/:id", TokenValidation, delInvoice);
router.post("/delDebsClient/:id", TokenValidation, delDebsClient);
router.post("/pdfcxp", TokenValidation, pdfcxp);
router.post("/pdfcxc", TokenValidation, pdfcxc);
router.post("/pdfcxpD", TokenValidation, pdfcxpD);
router.post("/pdfcxcD", TokenValidation, pdfcxcD);
router.post("/getDebsClient/:id_house", TokenValidation, getDebsClient);
router.post("/setDebsClient", TokenValidation, setDebsClient);
router.post("/getDebsClientList", TokenValidation, getDebsClientList);
router.post("/setCheckDebsClient", TokenValidation, setCheckDebsClient);
router.post("/getReportAccounts", TokenValidation, getReportAccounts);
router.put("/eliminar_spaymentpro", TokenValidation, eliminarSpaymentpro);
router.post(
  "/getReportAccountsFilter",
  TokenValidation,
  getReportAccountsFilter
);
router.post(
  "/getRequestPaymentConceptos/:id",
  TokenValidation,
  getRequestPaymentConceptos
);
router.get("/getSPaymentPro", TokenValidation, getSPaymentPro);
router.post("/getReporteCXP", TokenValidation, getReporteCXP);
router.get("/getReporteCXC", TokenValidation, getReporteCXC);
router.post("/getReporteCXCAdmin", TokenValidation, getReporteCXCAdmin);
router.get(
  "/listPagoControlGastoXProveedor/:id",
  TokenValidation,
  listPagoControlGastoXProveedor
);

router.put("/actualizar_debs_client", updateDebsClient);
export default router;
