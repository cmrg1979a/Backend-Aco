import request from "supertest";
import app from "../app";

it("validar getBanksList", async () => {
  const response = await request(app)
    .post(`/getBanksList`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar getListaPagosXProveedorCxP", async () => {
  const response = await request(app)
    .get(`/getListaPagosXProveedorCxP/2335`)
    .set("auth-token", process.env.authToken);
  let body = response.body;

  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});



















// it("validar getListBanksDetailsCxP", async () => {
//   const response = await request(app)
//     .get(
//       `/getListBanksDetailsCxP?id_branch=1&desde=&hasta=&nro_operacion=&id_cuenta=&id_proveedor=&monto=&id_moneda=&nro_factura=&nro_serie=&tipogastos=&tiposubgastos=&operativo=true&administrativo=true`
//     )
//     .set("auth-token", process.env.authToken);
//   let body = response.body;

//   expect(body.estadoflag).toBe(true);
//   expect(body.data.length).toBeGreaterThan(0);
// }, 1000000);
