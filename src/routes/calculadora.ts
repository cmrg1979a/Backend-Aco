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
  GetCotAereo,
  GetCotAereoResumen,
  GetCotFCL,
  GetCotFCLResumen,
  GetCotLCL,
  GetCotLCLResumen,
  GetTotalCotizacion,
  InsertCall,
  InsertCotizacionXCliente,
  ListUsuarioCalculadora,
  loginUsuarios,
  RegistrarCargaMasivaAereo,
  RegistrarCargaMasivaFCL,
  RegistrarCargaMasivaLCL,
  RegistrarCotizacionXCorreo,
  RegistrarUsuario,
  RegistrarUsuarioGmail,
  StatusCarge,
  UpdatePass,
  ValidarCorreoExiste,
  validarGenerarCotizacion,
  ValidarRegistrosAereo,
  ValidarRegistrosFCL,
  ValidarRegistrosLCL,
  validateToken,
} from "../controllers/calculadoraController";
import {
  calcCostoEditar,
  calcCostoEliminar,
  cargarPaises,
  cargarPuertos,
  getCalcCostos,
  getCalcCostosLis,
  getCalcDepartamentos,
  getCalcDepartamentoSearch,
  getCalcDistritos,
  getCalcDistritoSearch,
  getCalcMultiplicador,
  getCalcProfitList,
  getCalcServicio,
  getCalcServicioInsert,
  getCalcTransporte,
  getCalcTransporteGuardar,
  getCalObtenerMontos,
  getTipoCosto,
  getValDataLCL,
  getValidarCodigoWhatsapp,
  postCalcCostos,
  postCalcCostosInsert,
  postCalcProfit,
  postCalcProfitActualizar,
  postCalcProfitAnular,
} from "../controllers/calculadoraFletes";

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
router.get(
  "/export_listar_usuarios_calculadora",
  TokenValidation,
  ExportListUsuarioCalculadora
);
router.post("/gen_link_resset", GenerarTokenRecuperarContrasenia);
router.post("/validate_token", validateToken);
router.post("/reestablecer_clave", UpdatePass);
router.post("/cargue_status", TokenValidation, StatusCarge);
router.post("/insert_call", TokenValidation, InsertCall);
router.post("/cotizacion_cliente_register", InsertCotizacionXCliente);
router.get("/get_cot_fcl", TokenValidation, GetCotFCL);
router.get("/get_cot_fcl_resumen", TokenValidation, GetCotFCLResumen);
router.get("/get_cot_lcl", TokenValidation, GetCotLCL);
router.get("/get_cot_lcl_resumen", TokenValidation, GetCotLCLResumen);
router.get("/get_cot_aereo", TokenValidation, GetCotAereo);
router.get("/get_cot_aereo_resumen", TokenValidation, GetCotAereoResumen);
router.post("/get_total_cotizacion", GetTotalCotizacion);
router.get("/calc/cargar_puertos", cargarPuertos);
router.get("/calc/cargar_paises", cargarPaises);
router.get("/calc/tipo_costo", getTipoCosto);
router.get("/calc/servicio", getCalcServicio);
router.post("/calc/servicio/guardar", getCalcServicioInsert);
router.get("/calc/multiplicador", getCalcMultiplicador);
router.post("/calc/costos/insertar", postCalcCostosInsert);
router.get("/calc/costos", getCalcCostos);
router.post("/calc/val_data_lcl", getValDataLCL);
router.post("/calc/costos_calc", postCalcCostos);
router.get("/calc/costos_list", getCalcCostosLis);
router.post("/calc/profit", postCalcProfit);
router.put("/calc/profit/actualizar", postCalcProfitActualizar);
router.put("/calc/profit/anular", postCalcProfitAnular);
router.get("/calc/profit_list", getCalcProfitList);
router.put("/calc/costo/actualizar", calcCostoEditar);
router.put("/calc/costo/eliminar", calcCostoEliminar);
router.get("/calc/departamentos", getCalcDepartamentos);
router.get("/calc/distritos", getCalcDistritos);
router.post("/calc/transporte/guardar", getCalcTransporteGuardar);
router.get("/calc/transporte", getCalcTransporte);
router.get("/calc/departamento/search", getCalcDepartamentoSearch);
router.get("/calc/distrito/search", getCalcDistritoSearch);
router.post("/calc/montos", getCalObtenerMontos);
router.get("/calc/validar/codigo", getValidarCodigoWhatsapp);

export default router;
