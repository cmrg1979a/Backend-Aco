import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();

import {
  getEntitiesList,
  getEntitiesListId,
  getEntitiesListIc,
  addEntitie,
  addEntities,
  editEntitie,
  getPhones,
  getContacts,
  validationDocument,
} from "../controllers/entities.controller";

router.post("/getEntitiesList", TokenValidation, getEntitiesList);
router.post("/getEntitiesListId", TokenValidation, getEntitiesListId);
router.post("/getEntitiesListIc", TokenValidation, getEntitiesListIc);
router.post("/addEntitie", TokenValidation, addEntitie);
router.post("/addEntities", TokenValidation, addEntities);
router.post("/editEntitie/:id", TokenValidation, editEntitie);
router.post("/getPhone/:id_entitie", TokenValidation, getPhones);
router.post("/getContacts/:id_entitie", TokenValidation, getContacts);
router.get(
  "/validationDocument",
  TokenValidation,
  validationDocument
);

export default router;
