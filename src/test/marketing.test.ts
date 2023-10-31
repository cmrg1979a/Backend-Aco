import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getListMarketing", async () => {
  const response = await request(app)
    .post(`/getListMarketing?id_branch=1&name=&description=&position=&status=`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
