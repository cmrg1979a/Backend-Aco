import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getBracnh,
  getListEnterprise,
  insertEnterprise,
  readEnterprise,
  updateEnterprise,
  validateDocumentEnterprise,
} from "../controllers/enterprise.controller";

router.post("/getBranch/:id_branch", TokenValidation, getBracnh);
router.get("/listar_enterprise/", TokenValidation, getListEnterprise);
router.post("/insertar_enterprise/", TokenValidation, insertEnterprise);
router.get("/ver_enterprise/", TokenValidation, readEnterprise);
router.put("/actualizar_enterprise/", TokenValidation, updateEnterprise);
router.get("/validar_documento_enterprise/", TokenValidation, validateDocumentEnterprise);


export default router;
