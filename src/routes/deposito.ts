import { Router } from "express";
const router: Router = Router();
import { setFile, getFile } from "../controllers/deposito.controller";
import multer from "../libs/multer";
//Preuba

router.route("/deposito").post(multer.single("file"), setFile).get(getFile);

export default router;
