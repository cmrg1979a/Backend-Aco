import { Request, Response } from "express";
import { connect } from "../routes/database";

import { postHouse } from "../interface/house";
import { postHouseEdit } from "../interface/house";

export const setHouse = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postHouse = req.body;

  await conn.query(
    "INSERT INTO Table_HouseControl SET ?",
    [dataObj],
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
      conn.end();
    }
  );
};

export const getHouseList = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_master } = req.body;

  await conn.query(
    "SELECT * FROM view_houseList where id_master = ? and status <> 0",
    [id_master],
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
      conn.end();
    }
  );
};

export const getHouseListAll = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id_master } = req.body;

  await conn.query(
    "SELECT * FROM view_houseListAll where status <> 0",
    [id_master],
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
      conn.end();
    }
  );
};

export const getHouseListId = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.body;

  await conn.query(
    "SELECT * FROM view_houseListAll where id = ? and status <> 0",
    [id],
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
      conn.end();
    }
  );
};

export const getHouseServices = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.body;

  await conn.query(
    "SELECT * FROM view_houseService where id_house = ? ",
    [id],
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
      conn.end();
    }
  );
};

export const getHouseBitacora = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.body;

  await conn.query(
    "SELECT * FROM view_houseBitacora where id_house = ? ",
    [id],
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
      conn.end();
    }
  );
};

export const getHouseContainers = async (req: Request, res: Response) => {
  const conn = await connect();

  const { id } = req.body;

  await conn.query(
    "SELECT * FROM view_houseContainers where id_house = ? ",
    [id],
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
      conn.end();
    }
  );
};

export const setHouseEdit = async (req: Request, res: Response) => {
  const conn = await connect();

  const dataObj: postHouseEdit = req.body;
  const id = req.params.id;

  await conn.query(
    "UPDATE Table_HouseControl SET ?  WHERE id = ?",
    [dataObj, id],
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
      conn.end();
    }
  );
};
