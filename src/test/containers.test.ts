import request from "supertest";
import app from "../app";

it("Validar listar_containers", async () => {
  const response = await request(app)
    .get(`/listar_containers?id_branch=1&code=&name=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_containers", async () => {
  const response = await request(app)
    .post(`/insertar_containers?`)
    .send({
      id_branch: 1,
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      long: "1.5",
      width: "1.5",
      height: "1.5",
      maximumweight: "1.5",
      maximunvolumen: "1.5",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_containers", async () => {
  const response = await request(app)
    .get(`/ver_containers?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_containers", async () => {
  const response = await request(app)
    .put(`/actualizar_containers?`)
    .send({
      id: 1,
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      long: "1.5",
      width: "1.5",
      height: "1.5",
      maximumweight: "1.5",
      maximunvolumen: "1.5",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
