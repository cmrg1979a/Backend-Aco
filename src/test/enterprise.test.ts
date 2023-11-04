import request from "supertest";
import app from "../app";

it("Validar listar_enterprise", async () => {
  const response = await request(app)
    .get(`/listar_enterprise?id_branch=1&document=&trade_name=&business_name=&address=&status=&id_pais=&id_state=&id_city=&id_town=&id_document=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_enterprise", async () => {
  const response = await request(app)
    .post(`/insertar_enterprise?`)
    .send({
        id_branch: 1,
        id_logo: "",
        document: "12312312",
        trade_name: "EJEMPLO 001",
        business_name: "EJEMPLO 001",
        slogan: "",
        address: "DIRECCION 001",
        status: 1,
        id_pais: 139,
        id_state: 2,
        id_city: 10,
        id_town: 102,
        id_document: 1,
        ic: "",
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_enterprise", async () => {
  const response = await request(app)
    .get(`/ver_enterprise?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_enterprise", async () => {
  const response = await request(app)
    .put(`/actualizar_enterprise?`)
    .send({
      id: 1,
      id_logo: "",
      document: "12312312",
      trade_name: "EJEMPLO 001",
      business_name: "EJEMPLO 001",
      slogan: "",
      address: "DIRECCION 001",
      status: 1,
      id_pais: 139,
      id_state: 2,
      id_city: 10,
      id_town: 102,
      id_document: 1,
      ic: "",
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar validar_documento_enterprise", async () => {
    const response = await request(app)
      .get(`/validar_documento_enterprise?id_document=1&id_branch=1&document=12312315`)
      .set("auth-token", process.env.authToken);
    let body = response.body;
    expect(body.estadoflag).toBe(true);
    expect(body.data.length).toEqual(1);
});