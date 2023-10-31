import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getPerfomance", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/getPerfomance`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
  expect(body.data.length).toBeGreaterThan(1); // valida que traiga más de un registro
});

it("Validar getListPerformance", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/getListPerformance?id_branch=1&code=&description=&status`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
  expect(body.data.length).toBeGreaterThan(1); // valida que traiga más de un registro
});

it("Validar readPerformance", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/readPerformance?id=1`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
  expect(body.data.length).toEqual(1); // valida que traiga más de un registro
});
