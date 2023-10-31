import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getSex", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/getSex`)
    .set("auth-token", process.env.authToken)
    .send(data);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("Validar getListSex", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .get(`/getListSex?id_branch=1&code=&name=&acronym=&description=&status=`)
    .set("auth-token", process.env.authToken)
    .send(data);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});

it("Validar readSex", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .get(`/readSex?id=1`)
    .set("auth-token", process.env.authToken)
    .send(data);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
