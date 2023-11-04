import request from "supertest";
import app from "../app";

it("Validar listar_shipment", async () => {
  const response = await request(app)
    .get(
      `/listar_shipment?id_branch=1&id_transport=1&name=&description=&status=`
    )
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_shipment", async () => {
    const response = await request(app)
      .post(`/insertar_shipment?`)
      .send({
        id_branch: 1,
        code: "et1",
        name: "EJEMPLO TEST 0123",
        id_transport: 1,
        description: "EJEMPLO TEST 0123",
        status: 1,
      })
      .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
  });
  

it("Validar ver_shipment", async () => {
  const response = await request(app)
    .get(`/ver_shipment?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_shipment", async () => {
  const response = await request(app)
    .put(`/actualizar_shipment?`)
    .send({
      id: 1,
      name: "EJEMPLO TEST 0123",
      description: "EJEMPLO TEST 0123",
      id_transport: 1,
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar cargar_transports", async () => {
  const response = await request(app)
    .get(`/cargar_transports?id_branch=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
