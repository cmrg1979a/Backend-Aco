import { Request, Response } from "express";
import { convertToObject, isConstructorDeclaration } from "typescript";
import { connect } from "../routes/database";

export const getBitacoraList = async (req: Request, res: Response) => {
  const conn = await connect();

  conn.query(
    "SELECT * FROM view_bitacoraList WHERE  `status` <> 0 AND statusModule <> 0 AND statusBitacora <> 0 GROUP BY id_moduleBitacora ORDER BY id_moduleBitacora asc",
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "SELECT * FROM view_bitacoraList WHERE  `status` <> 0 AND statusModule <> 0 AND statusBitacora <> 0 AND id_moduleBitacora = ?",
              [item.id_moduleBitacora],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id_moduleBitacora: item.id_moduleBitacora,
                  nameGroupService: item.nameModule,
                  groupService: dataTes[0],
                });
                req.app.locals.itemsBitacoraList.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsBitacoraList = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsBitacoraList,
            });
          }, 800);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getBitacoraLineal = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM view_bitacoraList where status <> 0",
    (err, rows, fields) => {
      if (!err) {
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
