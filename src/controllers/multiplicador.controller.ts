import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getMultiplicador = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_shipment, containers, id_branch } = req.body;
  let code7;
  let code8;
  let code9;
  let code10;

  code7 = 7;
  code8 = 8;
  code9 = 9;
  code10 = 10;

  if (containers) {
    containers.map((item: any) => {
      if (item.id == 1) {
        code7 = "";
      }
      if (item.id == 2) {
        code10 = "";
      }
      if (item.id == 3) {
        code9 = "";
      }
      if (item.id == 4) {
        code8 = "";
      }
    });
  }

  await conn.query(
    "SELECT * FROM view_multiplicadorList where id_shipment = ? and status <> 0 and code <> ? and code <> ? and code <> ? and code <> ? and id_branch = ? ",
    [id_shipment, code7, code10, code9, code8, id_branch],
    
    (err, rows, fields) => {
      // console.log(code7);
      // console.log(code10);
      // console.log(code9);
      // console.log(code8);
      if (!err) {
        // console.log(containers)
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
