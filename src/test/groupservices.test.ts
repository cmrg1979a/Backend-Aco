import request from "supertest";
import app from "../app";

it("Validar listar_groupservices", async () => {
  const response = await request(app)
    .get(`/listar_groupservices?id_branch=1&code=&name=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_groupservices", async () => {
  const response = await request(app)
    .post(`/insertar_groupservices?`)
    .send({
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      status: 1,
      id_branch: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_groupservices", async () => {
  const response = await request(app)
    .get(`/ver_groupservices?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_groupservices", async () => {
  const response = await request(app)
    .put(`/actualizar_groupservices?`)
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
