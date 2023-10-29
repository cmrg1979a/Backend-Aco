import request from "supertest";
import app from "../app"; // Importa tu instancia de la aplicación Express

let authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb3dzIjpbeyJlc3RhZG9mbGFnIjp0cnVlLCJtZW5zYWplIjpudWxsLCJ0aXBvbWVuc2FqZSI6bnVsbCwiaWQiOjEsImlkX2VudGl0aWUiOjQsInVzdWFyaW8iOiJjenVyaXRhciIsImlkX3NlY3V0aXJ5IjoxLCJkZXBhcnRhbWVudG8iOjIsInN0YXR1c3VzZXIiOjEsIm5hbWVzIjoiQ2VzYXIiLCJzdXJuYW1lIjoiWnVyaXRhIiwic2Vjb25kX3N1cm5hbWUiOiJSYW1pcmV6IiwiYmlydGhkYXkiOiIxOTg3LTA5LTI3VDA1OjAwOjAwLjAwMFoiLCJpYyI6IjUwIiwiZG9jdW1lbnQiOiIwIiwic3RhdHVzZW50aXRpZSI6MSwiaWRfcGFpcyI6MTM5LCJpZF9zZXgiOjEsImlkX2RvY3VtZW50Ijo1LCJpZF9icmFuY2giOjEsInBhdGgiOiJodHRwczovL3Zpc3VhbHBoYXJtLmNvbS9hc3NldHMvOTcwL01vZHVsZS01OTViNDBiNzViYTAzNmVkMTE3ZDlmYmUuc3ZnIiwiY29kZSI6NzAwNSwibmFtZWRvY3VtZW50cyI6IlBBUyIsImRlc2NyaXB0aW9uIjoiUGFzYXBvcnRlIiwidHJhZGVfbmFtZSI6IlBJQyBDQVJHTyBTQUMgLSBQRVLDmiIsImlkX3BhaXNicmFjaCI6MTM5LCJpZF9zdGF0ZSI6MTUsIm5hbWVwYWlzIjoiUGVyw7oiLCJuYW1lc3RhdGUiOiJMaW1hIiwidXNlcnMiOiJjenVyaXRhciJ9XSwiaWF0IjoxNjk4NTM4MTQ1LCJleHAiOjE2OTg2MjQ1NDV9.W-8Krbdesu-lyRlrGWRqLsSBQ2MQkB6acioqkNywAM4";

it("Validar listado que trae datos ", async () => {
  const response = await request(app)
    .get(
      `/getQuoteList?id_branch=1&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`
    )
    .set("auth-token", authToken); // Usa "auth-token" en lugar de "Authorization"
  let body = response.body;

  expect(body.estadoflag).toBe(true);
  expect(body.data.length).toBeGreaterThan(1);
});
it("Validar listado que no trae datos ", async () => {
  const response = await request(app)
    .get(
      `/getQuoteList?id_branch=3&id_marketing=&id_status=&id_entities=&id_modality=&id_shipment=&id_incoterm=&fechainicio=&fechafin=&estado=`
    )
    .set("auth-token", authToken); // Usa "auth-token" en lugar de "Authorization"
  let body = response.body;

  expect(body.estadoflag).toBe(false);
  expect(body.data.length).toBe(1);
});
