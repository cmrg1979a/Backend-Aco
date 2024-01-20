import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getBracnh,
  getListEnterprise,
  insertEnterprise,
  readEnterprise,
  updateEnterprise,
  validateDocumentEnterpriseNuevo,
  validateDocumentEnterpriseEditar,
} from "../controllers/enterprise.controller";

router.post("/getBranch/:id_branch", TokenValidation, getBracnh);
router.get("/listar_enterprise/", TokenValidation, getListEnterprise);
router.post("/insertar_enterprise/", TokenValidation, insertEnterprise);
router.get("/ver_enterprise/", TokenValidation, readEnterprise);
router.put("/actualizar_enterprise/", TokenValidation, updateEnterprise);
router.get(
  "/validar__nuevo_documento_enterprise/",
  TokenValidation,
  validateDocumentEnterpriseNuevo
);
router.get(
  "/validar_editar_documento_enterprise/",
  TokenValidation,
  validateDocumentEnterpriseEditar
);

export default router;
