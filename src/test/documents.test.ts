import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar getDocumentsList", async () => {
  const data = {
    id_pais: 139,
  };
  const response = await request(app)
    .post(`/getDocumentsList`)
    .set("auth-token", process.env.authToken)
    .send(data); // Envia los datos en el cuerpo

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
it("Validar getListDocumentsByBranch", async () => {
  const data = {
    id_pais: 139,
  };
  const response = await request(app)
    .get(
      `/getListDocumentsByBranch?code=&name=&description=&status=&id_branch=1`
    )
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
it("Validar readDocuments", async () => {
  const data = {
    id_pais: 139,
  };
  const response = await request(app)
    .get(`/readDocuments?id=1`)
    .set("auth-token", process.env.authToken);

  let body = response.body;
  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
