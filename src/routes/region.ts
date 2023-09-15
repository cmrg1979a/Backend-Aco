import { Router } from "express";
const router: Router = Router();

import {
  ListRegions,
  InsertRegion
} from "../controllers/region.controller";

router.post("/getListRegions", ListRegions);
router.post("/insertRegion", InsertRegion);

export default router;
