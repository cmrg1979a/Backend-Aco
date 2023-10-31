import request from "supertest";
import app from "../app";
import dotenv from "dotenv";
dotenv.config();

it("Validar listado que trae datos ", async () => {
  const response = await request(app)
    .get(
      `/getQuoteList?id_branch=1&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`
    )
    .set("auth-token", process.env.authToken); // Usa "auth-token" en lugar de "Authorization"
  let body = response.body;

  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
it("Validar listado que no trae datos ", async () => {
  const response = await request(app)
    .get(
      `/getQuoteList?id_branch=3&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`
    )
    .set("auth-token", process.env.authToken); // Usa "auth-token" en lugar de "Authorization"
  let body = response.body;

  expect(body.estadoflag).toBe(false);
  expect(body.data.length).toBe(1);
});
