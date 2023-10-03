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

router.post("/getDocumentsList", TokenValidation, getDocumentsList);
router.get("/getListDocumentsByBranch/", getListDocumentsByBranch);
router.post("/insertDocuments/", insertDocuments);
router.get("/readDocuments/", readDocuments);
router.put("/updateDocuments/", updateDocuments);
router.put("/swicthDocuments/", swicthDocuments);

export default router;
