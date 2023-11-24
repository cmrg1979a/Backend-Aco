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
  CargarClientes,
  CargarProveedores,
  InsertPhones,
  ListarPhons,
  cargarPersona,
  getListProveedor,
  getValidaRazonSocial,
  GuardarProveedor,
  getValidaTipoDocumentoDocument
} from "../controllers/entities.controller";

router.post("/getEntitiesList", TokenValidation, getEntitiesList);
router.post("/getEntitiesListId", TokenValidation, getEntitiesListId);
router.post("/getEntitiesListIc", TokenValidation, getEntitiesListIc);
router.post("/addEntitie", TokenValidation, addEntitie);
router.post("/addEntities", TokenValidation, addEntities);
router.post("/editEntitie/:id", TokenValidation, editEntitie);
router.post("/getPhone/:id_entitie", TokenValidation, getPhones);

router.post("/getContacts/:id_entitie", TokenValidation, getContacts);
router.get("/validationDocument", TokenValidation, validationDocument);
router.post("/CargarClientes", TokenValidation, CargarClientes);
router.post("/CargarProveedores", TokenValidation, CargarProveedores);
router.post("/guardar_telefono", TokenValidation, InsertPhones);
router.get("/listar_phone/:id", TokenValidation, ListarPhons);
router.get("/cargar_persona", TokenValidation, cargarPersona);
router.get("/listado_proveedor", TokenValidation, getListProveedor);
router.get("/validar_razon_social", TokenValidation, getValidaRazonSocial);
router.post("/registrar_proveedor", TokenValidation, GuardarProveedor);
router.get("/validar_documento", TokenValidation, getValidaTipoDocumentoDocument);


export default router;
