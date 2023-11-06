import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

// it("Validar getSex", async () => {
//   const data = {
//     id_shipment: 1,
//     containers: "",
//     id_branch: 1,
//   };
//   const response = await request(app)
//     .post(`/getSex`)
//     .set("auth-token", process.env.authToken)
//     .send(data);

//   let body = response.body;
//   expect(body.estadoflag).toBe(true);
//   expect(body.data.length).toBeGreaterThan(1);
// });


it("Validar listar_sex", async () => {
  const response = await request(app)
    .get(`/listar_sex?id_branch=1&code=&name=&acronym=&description=&status=`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("validar insertar_sex", async () => {
  const response = await request(app)
    .post(`/insertar_sex?`)
    .send({
        id_branch: 1,
        acronym: "IND",
        name: "EJEMPLO TEST 951",
        description: "EJEMPLO TEST 951",
        status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar ver_sex", async () => {
  const response = await request(app)
    .get(`/ver_sex?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("validar actualizar_sex", async () => {
  const response = await request(app)
    .put(`/actualizar_sex?`)
    .send({
      id: 3,
      acronym: "IND",
      name: "EJEMPLO TEST 951",
      description: "EJEMPLO TEST 951",
      status: 1,
    })
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});

it("Validar validar_acronimo_sex", async () => {
  const response = await request(app)
    .get(`/validar_acronimo_sex?id=0&acronym=IND&id_branch=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.status).toBe(200);
  expect(body.data.length).toEqual(1);
});
