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
    .post(
      `/getListMarketing?id_branch=1&name=&description=&position=&status=`
    )
    .set("auth-token", process.env.authToken)
    .send(data); // Envia los datos en el cuerpo

  let body = response.body;
  expect(body.estadoflag).toBe(true); // valida que traiga el estadoflag como true
  expect(body.data.length).toBeGreaterThan(1);  // valida que traiga más de un registro
});

