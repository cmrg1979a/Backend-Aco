import request from "supertest";
import app from "../app";

it("validar listar_bank", async () => {
  const response = await request(app)
    .get(`/listar_bank?id_branch=1&code=&name=&acronym=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_bank", async () => {
  const response = await request(app)
    .post(`/insertar_bank?`)
    .send({
      id_branch: 1, 
      acronym: "EJ1",
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar ver_bank", async () => {
  const response = await request(app)
    .get(`/ver_bank?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_bank", async () => {
  const response = await request(app)
    .put(`/actualizar_bank?`)
    .send({
      id: 1, 
      acronym: "EJ01",
      name: "EJEMPLO 1234",
      description: "EJEMPLO 1234",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

// it("validar getListaPagosXProveedorCxP", async () => {
//   const response = await request(app)
//     .get(`/getListaPagosXProveedorCxP/2335`)
//     .set("auth-token", process.env.authToken);
//   let body = response.body;

//   expect(body.estadoflag).toBe(true);
//   expect(body.data.length).toBeGreaterThan(0);
// });



















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
