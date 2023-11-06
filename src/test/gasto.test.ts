import request from "supertest";
import app from "../app";

it("Validar listar_gasto", async () => {
  const response = await request(app)
    .get(`/listar_gasto?id_branch=1&code=&name=&description=&status=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_gasto", async () => {
  const response = await request(app)
    .post(`/insertar_gasto?`)
    .send({
        id_branch: 1,
        code: "ej97",
        description: "EJEMPLO 951",
        calculoflag: false,
        status: false,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_gasto", async () => {
  const response = await request(app)
    .get(`/ver_gasto?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_gasto", async () => {
  const response = await request(app)
    .put(`/actualizar_gasto?`)
    .send({
      id: 1,
      description: "EJEMPLO 123",
      calculoflag: true,
      status: true,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar validar_codigo_gasto", async () => {
  const response = await request(app)
    .get(`/validar_codigo_gasto?id=1&id_branch=1&code=12`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
