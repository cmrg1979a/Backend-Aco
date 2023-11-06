import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getDocumentsList", async () => {
  const data = {
    id_pais: 139,
  };
  const response = await request(app)
    .post(`/getDocumentsList`)
    .set("auth-token", process.env.authToken)
    .send(data); // Envia los datos en el cuerpo

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("Validar listar_documents", async () => {
  const response = await request(app)
    .get(`/listar_documents?id_branch=1&code=&name=&description=&status=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_documents", async () => {
  const response = await request(app)
    .post(`/insertar_documents?`)
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

it("Validar ver_documents", async () => {
  const response = await request(app)
    .get(`/ver_documents?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_documents", async () => {
  const response = await request(app)
    .put(`/actualizar_documents?`)
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
