import { Request, Response } from "express";
import { connect } from "../routes/database";

export const getModuleRole = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_module } = req.body;
  await conn.query(
    `SELECT * FROM view_moduleRole where id_module = ${req.body.id_module} and status <> 0`,

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

export const getRole = async (req: Request, res: Response) => {
  const conn = await connect();

  await conn.query(
    "SELECT * FROM Table_Role where status <> 0",
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

export const editRole = async (req: Request, res: Response) => {
  const conn = await connect();
  const { id_entities } = req.params;
  const { id_role } = req.body;
  await conn.query(
    "UPDATE Entities_Role set id_role = ? where id_entities = ?",
    [id_role, id_entities],
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
