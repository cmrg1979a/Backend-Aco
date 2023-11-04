import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getPerfomance", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/getPerfomance`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
  expect(body.data.length).toBeGreaterThan(1); // valida que traiga más de un registro
});

it("Validar listar_performance", async () => {
  const response = await request(app)
    .get(`/listar_performance?id_branch=1&code=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_performance", async () => {
  const response = await request(app)
    .post(`/insertar_performance?`)
    .send({
      description: "TEST EJEMPLO 951",
      status: 1,
      id_branch: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_performance", async () => {
  const response = await request(app)
    .get(`/ver_performance?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_performance", async () => {
  const response = await request(app)
    .put(`/actualizar_performance?`)
    .send({
      id: 5,
      description: "EJEMPLO TEST 123",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
