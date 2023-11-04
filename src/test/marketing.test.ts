import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar listar_marketing", async () => {
  const response = await request(app)
    .get(`/listar_marketing?id_branch=1&name=&description=&position=&status=`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_marketing", async () => {
  const response = await request(app)
    .post(`/insertar_marketing?`)
    .send({
      name: "EJEMPLO 234 TEST",
      description: "EJEMPLO 234 TEST",
      position: 23,
      status: 1,
      id_branch: 20,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_marketing", async () => {
  const response = await request(app)
    .get(`/ver_marketing?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_marketing", async () => {
  const response = await request(app)
    .put(`/actualizar_marketing?`)
    .send({
      id: 20,
      name: "EJEMPLO 123 TEST",
      description: "EJEMPLO 123 TEST",
      position: 16,
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ultima_posicion_marketing", async () => {
  const response = await request(app)
    .get(`/ultima_posicion_marketing?id=&id_branch=1&position=12`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.status).toBe(200);
  expect(body.data.length).toEqual(1);
});

it("Validar validar_posicion_marketing", async () => {
  const response = await request(app)
    .get(`/validar_posicion_marketing?id_branch=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.status).toBe(200);
  expect(body.data.length).toEqual(1);
});
