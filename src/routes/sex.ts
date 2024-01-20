import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getSex,
  getListSex,
  insertSex,
  readSex,
  updateSex,
  validateAcronymInTableSexNuevo,
  validateAcronymInTableSexEditar,
} from "../controllers/sex.controller";

router.post("/getSex", TokenValidation, getSex);

router.get("/listar_sex/", TokenValidation, getListSex);
router.post("/insertar_sex/", TokenValidation, insertSex);
router.get("/ver_sex/", TokenValidation, readSex);
router.put("/actualizar_sex/", TokenValidation, updateSex);
router.get(
  "/validar_nuevo_acronimo_sex/",
  TokenValidation,
  validateAcronymInTableSexNuevo
);
router.get(
  "/validar_editar_acronimo_sex/",
  TokenValidation,
  validateAcronymInTableSexEditar
);

export default router;
