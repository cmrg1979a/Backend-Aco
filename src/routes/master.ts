import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../libs/verifyToken";

import {
  setMaster,
  getMasterList,
  getMasterId,
  editMaster,
  lockMaster,
  lockMasterAdm,
  nullMaster,
  getCargarHouse,
  updateFolderOneDrive,
  insertComentarioMaster,
  cargarMaster,
  getTotalMasterList,
} from "../controllers/master.controller";

router.post("/setMaster", TokenValidation, setMaster);
router.post("/editMaster/:id", TokenValidation, editMaster);
router.post("/getMasterId/:id", TokenValidation, getMasterId);
router.post("/lockMaster/:id", TokenValidation, lockMaster);
router.post("/lockMasterAdm/:id", TokenValidation, lockMasterAdm);
router.post("/nullMaster/:id", TokenValidation, nullMaster);
router.get("/getMasterList", TokenValidation, getMasterList);
router.get("/getTotalMasterList", TokenValidation, getTotalMasterList);
router.get("/cargar_house", TokenValidation, getCargarHouse);
router.get("/cargar_master", TokenValidation, cargarMaster);
router.put("/update_folder_onedrive", TokenValidation, updateFolderOneDrive);
router.post(
  "/insert_comentario_master",
  TokenValidation,
  insertComentarioMaster
);

export default router;
