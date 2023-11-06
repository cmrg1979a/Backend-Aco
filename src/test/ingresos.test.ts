import request from "supertest";
import app from "../app";

it("Validar listar_ingreso", async () => {
  const response = await request(app)
    .get(
      `/listar_ingreso?id_branch=1&code=&name=&calculoflag=&description=&status=`
    )
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_ingreso", async () => {
  const response = await request(app)
    .post(`/insertar_ingreso?`)
    .send({
      id_branch: 1,
      code: "E23",
      description: "EJEMPLO 123",
      calculoflag: false,
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_ingreso", async () => {
  const response = await request(app)
    .get(`/ver_ingreso?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_ingreso", async () => {
  const response = await request(app)
    .put(`/actualizar_ingreso?`)
    .send({
      id: 6,
      description: "EJEMPLO 123456",
      calculoflag: false,
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar validar_codigo_ingreso", async () => {
  const response = await request(app)
    .get(`/validar_codigo_ingreso?id=0&id_branch=1&document=abcde`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
