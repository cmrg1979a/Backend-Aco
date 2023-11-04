import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

// it("Validar getMultiplicador", async () => {
//   const data = {
//     id_shipment: 1,
//     containers: "",
//     id_branch: 1,
//   };
//   const response = await request(app)
//     .post(`/getMultiplicador`)
//     .set("auth-token", process.env.authToken)
//     .send(data);

//   let body = response.body;
//   expect(body.estadoflag).toBe(true);
//   expect(body.data.length).toBeGreaterThan(1);
// });

it("Validar listar_multiplicador", async () => {
  const response = await request(app)
    .get(`/listar_multiplicador?id_branch=1&code=&name=&description=&id_shipment=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("Validar ver_multiplicador", async () => {
  const response = await request(app)
    .get(`/ver_multiplicador?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_multiplicador", async () => {
  const response = await request(app)
    .put(`/actualizar_multiplicador?`)
    .send({
      id: 9,
      name: "40 HC CONTENEDOR",
      description: "40 HC CONTENEDORR",
      id_shipment: 1,
      valor: 1,
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar cargar_shipment", async () => {
  const response = await request(app)
    .get(`/cargar_shipment?id_branch=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});