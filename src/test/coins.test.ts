import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getCoinsList", async () => {
  const response = await request(app)
    .post(`/getCoinsList`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("Validar listar_coins", async () => {
  const response = await request(app)
    .get(
      `/listar_coins?id_branch=1&code=&symbol=&acronym=&name=&description=&status=`
    )
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_coins", async () => {
  const response = await request(app)
    .post(`/insertar_coins?`)
    .send({
      id_branch: 1,
      symbol: "EJ1",
      acronym: "EJ1",
      name: "EJEMPLO 123",
      description: "EJEMPLO 123",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_coins", async () => {
  const response = await request(app)
    .get(`/ver_coins?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_coins", async () => {
  const response = await request(app)
    .put(`/actualizar_coins?`)
    .send({
      id: 1, 
      symbol: "EJ1",
      acronym: "EJ01",
      name: "EJEMPLO 1234",
      description: "EJEMPLO 1234",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
