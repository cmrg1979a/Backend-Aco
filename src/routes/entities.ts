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
  getValidaTipoDocumentoDocument,
  getVerProveedor,
  actualizarProveedor,
  eliminarProveedor,
  telContactoProveedor,
  getListCliente,
  GuardarCliente,
  getVerCliente,
  ActualizarCliente,
  ListarPersonaTipoPersona,
  guardarRolProveedor,
  cargarProveedoresXRol,
  cargarProveedoresRolNoShipper,
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
router.get("/CargarClientes", TokenValidation, CargarClientes);
router.get("/CargarProveedores", TokenValidation, CargarProveedores);
router.post("/guardar_telefono", TokenValidation, InsertPhones);
router.get("/listar_phone/:id", TokenValidation, ListarPhons);
router.get("/cargar_persona", TokenValidation, cargarPersona);
router.get("/listado_proveedor", TokenValidation, getListProveedor);
router.get("/validar_razon_social", TokenValidation, getValidaRazonSocial);
router.post("/registrar_proveedor", TokenValidation, GuardarProveedor);
router.get(
  "/validar_documento",
  TokenValidation,
  getValidaTipoDocumentoDocument
);
router.get("/ver_proveedor", TokenValidation, getVerProveedor);
router.put("/actualizar_proveedor", TokenValidation, actualizarProveedor);
router.put("/eliminar_proveedor", TokenValidation, eliminarProveedor);
router.get("/tel_contacto_proveedor", TokenValidation, telContactoProveedor);
router.get("/cargar_proveedor_x_rol", TokenValidation, cargarProveedoresXRol);
router.get("/cargar_proveedor_rol_no_shipper", TokenValidation, cargarProveedoresRolNoShipper);

// CLIENTES
router.get("/listado_clientes", TokenValidation, getListCliente);
router.post("/registrar_cliente", TokenValidation, GuardarCliente);
router.get("/ver_cliente", TokenValidation, getVerCliente);
router.put("/actualizar_cliente", TokenValidation, ActualizarCliente);
router.get("/listar_persona_tipo_persona", TokenValidation, ListarPersonaTipoPersona);
router.put("/actualizar_rol_proveedor", TokenValidation, guardarRolProveedor);

export default router;
