import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import { getChargeYear} from "../controllers/yearController";

router.get("/getChargeYear", TokenValidation, getChargeYear);
// router.post("/getPortEnd", TokenValidation, getPortEnd);

export default router;
