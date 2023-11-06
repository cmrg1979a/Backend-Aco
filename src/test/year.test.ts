import request from "supertest";
import app from "../app";
it("Validar listar_year", async () => {
  const response = await request(app)
    .get(`/listar_year?id_branch=1&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_year", async () => {
  const response = await request(app)
    .post(`/insertar_year?`)
    .send({
        description: "2050",
        status: 1,
        id_branch: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_year", async () => {
  const response = await request(app)
    .get(`/ver_year?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_year", async () => {
  const response = await request(app)
    .put(`/actualizar_year?`)
    .send({
      id: 15,
      description: "2035",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
