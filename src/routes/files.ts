import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getFilesQuote,
} from "../controllers/files.controller";

router.post("/getFilesQuote/:id_quote", TokenValidation, getFilesQuote);

export default router;
