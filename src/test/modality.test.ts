import request from "supertest";
import app from "../app";

it("Validar listar_modality", async () => {
  const response = await request(app)
    .get(`/listar_modality?id_branch=1&code=&name=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_modality", async () => {
  const response = await request(app)
    .post(`/insertar_modality?`)
    .send({
      id_branch: 1,
      code: "ej97",
      name: "EJEMPLO 951",
      description: "EJEMPLO 951",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_modality", async () => {
  const response = await request(app)
    .get(`/ver_modality?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_modality", async () => {
  const response = await request(app)
    .put(`/actualizar_modality?`)
    .send({
      id: 1,
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
