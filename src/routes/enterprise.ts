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
router.get("/listar_enterprise/", getListEnterprise);
router.post("/insertar_enterprise/", insertEnterprise);
router.get("/ver_enterprise/", readEnterprise);
router.put("/actualizar_enterprise/", updateEnterprise);
router.get("/validar_documento_enterprise/", validateDocumentEnterprise);


export default router;
