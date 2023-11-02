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

it("Validar getListCoinsByBranch", async () => {
  const response = await request(app)
    .get(
      `/getListCoinsByBranch?id_branch=1&code=&symbol=&acronym=&name=&description=&status=`
    )
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
it("Validar readCoins", async () => {
  const response = await request(app)
    .get(`/readCoins?id=1`)
    .set("auth-token", process.env.authToken);
  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toEqual(1);
});
