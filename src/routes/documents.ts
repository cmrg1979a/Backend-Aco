import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getDocumentsList,
  getListDocumentsByBranch,
  insertDocuments,
  readDocuments,
  updateDocuments,
} from "../controllers/documents.controller";

router.post("/getDocumentsList", TokenValidation, TokenValidation, getDocumentsList);
router.get("/listar_documents/", TokenValidation, getListDocumentsByBranch);
router.post("/insertar_documents/", TokenValidation, insertDocuments);
router.get("/ver_documents/", TokenValidation, readDocuments);
router.put("/actualizar_documents/", TokenValidation, updateDocuments);

export default router;
