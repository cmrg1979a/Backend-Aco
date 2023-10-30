"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJlc3RhZG9mbGFnIjp0cnVlLCJtZW5zYWplIjpudWxsLCJ0aXBvbWVuc2FqZSI6bnVsbCwiaWQiOjEsImlkX2VudGl0aWUiOjQsInVzdWFyaW8iOiJjenVyaXRhciIsImlkX3NlY3V0aXJ5IjoxLCJkZXBhcnRhbWVudG8iOjIsInN0YXR1c3VzZXIiOjEsIm5hbWVzIjoiQ2VzYXIiLCJzdXJuYW1lIjoiWnVyaXRhIiwic2Vjb25kX3N1cm5hbWUiOiJSYW1pcmV6IiwiYmlydGhkYXkiOiIxOTg3LTA5LTI3VDA1OjAwOjAwLjAwMFoiLCJpYyI6IjUwIiwiZG9jdW1lbnQiOiIwIiwic3RhdHVzZW50aXRpZSI6MSwiaWRfcGFpcyI6MTM5LCJpZF9zZXgiOjEsImlkX2RvY3VtZW50Ijo1LCJpZF9icmFuY2giOjEsInBhdGgiOiJodHRwczovL3Zpc3VhbHBoYXJtLmNvbS9hc3NldHMvOTcwL01vZHVsZS01OTViNDBiNzViYTAzNmVkMTE3ZDlmYmUuc3ZnIiwiY29kZSI6NzAwNSwibmFtZWRvY3VtZW50cyI6IlBBUyIsImRlc2NyaXB0aW9uIjoiUGFzYXBvcnRlIiwidHJhZGVfbmFtZSI6IlBJQyBDQVJHTyBTQUMgLSBQRVLDmiIsImlkX3BhaXNicmFjaCI6MTM5LCJpZF9zdGF0ZSI6MTUsIm5hbWVwYWlzIjoiUGVyw7oiLCJuYW1lc3RhdGUiOiJMaW1hIiwidXNlcnMiOiJjenVyaXRhciJ9XSwiaWF0IjoxNjk4Njg0ODAxLCJleHAiOjE2OTg3NzEyMDF9.3yYkMOlEpe0F4mhuu5Cy7WRzo9OR8fMn4QI8fG4pwqA";
it("getBanksList", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, supertest_1.default)(app_1.default)
        .post(`/getBanksList`)
        .set("auth-token", authToken); // Usa "auth-token" en lugar de "Authorization"
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toBeGreaterThan(1);
    if (response.error) {
        console.log(response.error);
    }
}));
// getBanksList
// getListaPagosXProveedorCxP
// setPayForProveedor
// getListBanksDetailsCargar
// getListBanksDetailsCxP
// getVerPagosPorProveedor
// setPayForCustomer
// getListarPayForCustomer
// getVerPagosPorCustomer
// getListaPagosXProveedorCxC
// exportar_listado_reporte_pagos
// registro_pago_detalles
// ver_pago_invoice
// ver_pago_cgegreso
// actualizar_pago_invoice
// actualizar_pago_cgegreso
// ver_ingresos_invoice
// ver_ingresos_debscliente
// actualizar_ingreso_invoice
// actualizar_ingreso_debscliente
// exportar_listado_reporte_egresos
// exportar_listado_reporte_ingresos
// reversar_debscliente
// reversar_debsproveedor
// ver_pagoscontrol_egresos
// validar_nro_operacion
// getListBank
// insertBank
// readBank
// updateBank
// switchBank
//# sourceMappingURL=banks.test.js.map