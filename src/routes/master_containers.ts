import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import { setMasterContainers } from "../controllers/master_containers.controller";

router.post("/setMasterContainers", TokenValidation, setMasterContainers);

export default router;
