import request from "supertest";
import app from "../app";

it("Validar getQuoteList", async () => {
  const response = await request(app)
    .get(
      `/getQuoteList?id_branch=1&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`
    )
    .set("auth-token", process.env.authToken);
  let body = response.body;

  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});
