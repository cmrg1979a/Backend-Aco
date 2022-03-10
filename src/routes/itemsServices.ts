import { Router } from "express";
const router: Router = Router();
import { TokenValidation } from "../libs/verifyToken";

import {
  getItemsServices,
  getItemsServicesList,
  getItemsServicesDetails,
} from "../controllers/itemsServices.controller";

router.post("/getItemsServices", TokenValidation, getItemsServices);
router.post("/getItemsServicesList", TokenValidation, getItemsServicesList);
router.post(
  "/getItemsServicesDetails",
  TokenValidation,
  getItemsServicesDetails
);

export default router;
