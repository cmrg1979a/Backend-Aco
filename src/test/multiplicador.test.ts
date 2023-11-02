import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getMultiplicador", async () => {
  const data = {
    id_shipment: 1,
    containers: "",
    id_branch: 1,
  };
  const response = await request(app)
    .post(`/getMultiplicador`)
    .set("auth-token", process.env.authToken)
    .send(data);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
