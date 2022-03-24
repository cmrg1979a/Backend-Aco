import { Request, Response } from "express";
import { convertToObject, isConstructorDeclaration } from "typescript";
import { connect } from "../routes/database";

export const getItemsServices = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;
  conn.query(
    "SELECT * FROM view_itemsServices where status <> 0 and id_modality = ? and id_shipment = ? and id_incoterms = ?  and id_branch = ? group by id_begend order by id_begend asc",
    [id_modality, id_shipment, id_incoterms, id_branch],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        // console.log(datanew);

        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "SELECT * FROM view_itemsServices where status <> 0 and id_modality = ? and id_shipment = ? and id_incoterms = ? and id_begend = ? group by id_groupServices",
              [id_modality, id_shipment, id_incoterms, item.id_begend],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                dataServiceList.sort((a: any, b: any) => {
                  if (a.position < b.position) {
                    return -1;
                  }
                  if (a.position > b.position) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id_BegEnd: item.id_begend,
                  codeGroupServices: item.codeGroupServices,
                  nameGroupService: item.nameBegEnd,
                  groupService: dataTes[0],
                });
                req.app.locals.itemsService.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsService = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsService,
            });
            conn.end();
          }, 800);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getItemsServicesDetails = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_modality, id_shipment, id_incoterms, id_branch } = req.body;
  conn.query(
    "SELECT * FROM view_itemsServices where status <> 0 and id_modality = ? and id_shipment = ? and id_incoterms = ? and id_branch = ? group by id_begend order by id_begend asc",
    [id_modality, id_shipment, id_incoterms, id_branch],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));
        let dataServiceList;
        new Promise<void>((resolver, rechazar) => {
          datanew.map((item: any) => {
            conn.query(
              "SELECT * FROM view_itemsServices where status <> 0 and id_modality = ? and id_shipment = ? and id_incoterms = ? and id_begend = ?",
              [id_modality, id_shipment, id_incoterms, item.id_begend],
              (err, rows, fields) => {
                dataServiceList = JSON.parse(JSON.stringify(rows));
                dataServiceList.sort((a: any, b: any) => {
                  if (a.position < b.position) {
                    return -1;
                  }
                  if (a.position > b.position) {
                    return 1;
                  }
                  return 0;
                });
                let dataTes = [];
                let dataPre = [];
                dataTes.push(dataServiceList);
                dataPre.push({
                  id_BegEnd: item.id_begend,
                  nameGroupService: item.nameBegEnd,
                  groupService: dataTes[0],
                });
                req.app.locals.itemsService.push(dataPre[0]);
              }
            );
          });
          req.app.locals.itemsService = [];
          resolver();
          console.log(resolver);
        }).then(() => {
          setTimeout(() => {
            res.json({
              status: 200,
              statusBol: true,
              data: req.app.locals.itemsService,
            });
            conn.end();
          }, 1000);
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const getItemsServicesList = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_modality, id_shipment, id_incoterms } = req.body;
  conn.query(
    "SELECT * FROM view_itemsServices where status <> 0 and id_modality = ? and id_shipment = ? and id_incoterms = ? group by id_groupServices",
    [id_modality, id_shipment, id_incoterms],
    (err, rows, fields) => {
      if (!err) {
        let datanew = JSON.parse(JSON.stringify(rows));

        res.json({
          status: 200,
          statusBol: true,
          data: datanew,
        });
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};
