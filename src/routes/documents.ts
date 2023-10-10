import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getDocumentsList,
  getListDocumentsByBranch,
  insertDocuments,
  readDocuments,
  updateDocuments,
  swicthDocuments,
} from "../controllers/documents.controller";

router.post("/getDocumentsList", TokenValidation, TokenValidation, getDocumentsList);
router.get("/getListDocumentsByBranch/", TokenValidation, getListDocumentsByBranch);
router.post("/insertDocuments/", TokenValidation, insertDocuments);
router.get("/readDocuments/", TokenValidation, readDocuments);
router.put("/updateDocuments/", TokenValidation, updateDocuments);
router.put("/swicthDocuments/", TokenValidation, swicthDocuments);

export default router;
