import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getModules = async (req: Request, res: Response) => {
  const conn = await connect();
  const { branch } = req.params;
  await conn.query(
    "SELECT * FROM view_enterprise_modules where id_branch = ? and status <> 0 and statusModules <> 0",
    [branch],
    (err, rows) => {
      if (!err) {
        res.json({
          status: 200,
          statusBol: true,
          data: rows,
        });
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};

export const getEntitieModules = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_entitie } = req.body;
  var datanew = new Array();

  await conn.query(
    "SELECT * FROM view_entitie_modules where id_entitie = ? and status <> 0 and statusModule <> 0",
    [id_entitie],
    (err, rows) => {
      const data = JSON.parse(JSON.stringify(rows));
      if (!err) {
        data.map(function (item: any) {
          datanew.push({
            id: item.id_modules,
            name: item.name,
            icon: item.icon,
            description: item.description,
            path: item.path,
            statusModule: item.statusModule,
          });
        });
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

export const getMenuModules = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_entitie, id_module, id_group } = req.body;
  var datanew = new Array();

  await conn.query(
    "SELECT * FROM view_entitie_menu where id_entitie = ? and id_module = ? AND id_group = ?",
    [id_entitie, id_module, id_group],
    (err, rows) => {
      const data = JSON.parse(JSON.stringify(rows));
      if (!err) {
        data.map(function (item: any) {
          datanew.push({
            id: item.id,
            name: item.name,
            icon: item.icon,
            id_role: item.id_role,
            description: item.description,
            path: item.path,
            route: item.route,
          });
        });
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

export const getGroupList = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_entitie, id_module } = req.body;
  var datanew = new Array();

  await conn.query(
    "SELECT DISTINCT(id_group), vem.nameGroup, vem.iconGroup FROM view_entitie_menu vem WHERE id_entitie = ? AND id_module = ?",
    [id_entitie, id_module],
    (err, rows) => {
      const data = JSON.parse(JSON.stringify(rows));
      if (!err) {
        /* data.map(function(item:any){
          datanew.push({
            id: item.id, 
            name: item.name, 
            icon: item.icon, 
            description: item.description, 
            path: item.path, 
            route: item.route
          }) 
        }) */
        res.json({
          data,
        });
      } else {
        console.log(err);
      }
      conn.end();
    }
  );
};
