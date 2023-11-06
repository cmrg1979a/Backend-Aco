import request from "supertest";
import app from "../app";

it("Validar listar_incoterms", async () => {
  const response = await request(app)
    .get(`/listar_incoterms?id_branch=1&name=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_incoterms", async () => {
  const response = await request(app)
    .post(`/insertar_incoterms?`)
    .send({
      id_branch: 1,
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_incoterms", async () => {
  const response = await request(app)
    .get(`/ver_incoterms?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_incoterms", async () => {
  const response = await request(app)
    .put(`/actualizar_incoterms?`)
    .send({
      id: 23,
      description: "EJEMPLO 123456",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
