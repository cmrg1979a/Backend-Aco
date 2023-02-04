import { Router } from "express";
import { TokenValidation } from "../libs/verifyToken";
const router: Router = Router();
import {
  CargarContendeores,
  CargarMoneda,
  CargarNavieras,
  CargarPais,
  CargarPuertoXPaisXTipo,
  CargarSucursal,
  ExportListUsuarioCalculadora,
  GenerarTokenRecuperarContrasenia,
  ListUsuarioCalculadora,
  loginUsuarios,
  RegistrarCargaMasivaAereo,
  RegistrarCargaMasivaFCL,
  RegistrarCargaMasivaLCL,
  RegistrarCotizacionXCorreo,
  RegistrarUsuario,
  RegistrarUsuarioGmail,
  UpdatePass,
  ValidarCorreoExiste,
  validarGenerarCotizacion,
  ValidarRegistrosAereo,
  ValidarRegistrosFCL,
  ValidarRegistrosLCL,
  validateToken,
} from "../controllers/calculadoraController";

router.get("/validar_correo/:correo", ValidarCorreoExiste);
router.post("/registrar_usuarios", RegistrarUsuario);
router.post("/registrar_usuariosgmail", RegistrarUsuarioGmail);
router.post("/login_usuarios", loginUsuarios);
router.get("/validar_cotizacion/:correo/:ip", validarGenerarCotizacion);
router.post("/registrar_cotizacion_correo", RegistrarCotizacionXCorreo);
// PARA CARGA MASIVA
router.get("/cargar_moneda", TokenValidation, CargarMoneda);
router.get("/cargar_pais_calc", TokenValidation, CargarPais);
router.get("/cargar_contenedores", TokenValidation, CargarContendeores);
router.get("/cargar_navieras", TokenValidation, CargarNavieras);
router.get(
  "/CargarPuertoXPaisXTipo/:id_pais/:tipo",
  TokenValidation,
  CargarPuertoXPaisXTipo
);
router.post("/validar_registros_lcl", TokenValidation, ValidarRegistrosLCL);

router.post("/validar_registros_fcl", TokenValidation, ValidarRegistrosFCL);
router.post("/validar_registros_aereo", TokenValidation, ValidarRegistrosAereo);
router.post("/cargar_sucursal", TokenValidation, CargarSucursal);

router.post(
  "/registrar_carga_masiva_lcl",
  TokenValidation,
  RegistrarCargaMasivaLCL
);
router.post(
  "/registrar_carga_masiva_fcl",
  TokenValidation,
  RegistrarCargaMasivaFCL
);
router.post(
  "/registrar_carga_masiva_aereo",
  TokenValidation,
  RegistrarCargaMasivaAereo
);
router.post(
  "/listar_usuarios_calculadora",
  TokenValidation,
  ListUsuarioCalculadora
);
router.post(
  "/export_listar_usuarios_calculadora",
  TokenValidation,
  ExportListUsuarioCalculadora
);
router.post("/gen_link_resset", GenerarTokenRecuperarContrasenia);
router.post("/validate_token", validateToken);
router.post("/reestablecer_clave", UpdatePass);

export default router;
