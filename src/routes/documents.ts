import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getDocumentsList,
} from "../controllers/documents.controller";

router.post("/getDocumentsList", TokenValidation, getDocumentsList);

export default router;
