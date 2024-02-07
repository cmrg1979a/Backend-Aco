import { Request, Response } from "express";
import { conexion } from "../routes/databasePGOp";
import { iStatusQuote } from "../interface/iStatusQuote";
const pool = conexion();

export const ListStatusQuote = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;

  await pool.query(
    "SELECT * FROM function_quotestus_listar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [
      statusQuote.id_branch ? statusQuote.id_branch : null,
      statusQuote.code ? statusQuote.code : null,
      statusQuote.name ? statusQuote.name : null,
      statusQuote.description ? statusQuote.description : null,
      statusQuote.position ? statusQuote.position : null,
      statusQuote.position_report ? statusQuote.position_report : null,
      statusQuote.position_select ? statusQuote.position_select : null,
      statusQuote.position_calls ? statusQuote.position_calls : null,
      statusQuote.status_calls ? statusQuote.status_calls : null,
      statusQuote.status_calls_all ? statusQuote.status_calls_all : null,
      statusQuote.status !== "" ? statusQuote.status : null,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const MaxPositionQuoteStatus = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;

  await pool.query(
    "SELECT * FROM function_quote_status_max_position($1)",
    [statusQuote.id_branch ? statusQuote.id_branch : null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          estadoflag: rows[0].estadoflag,
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validatePosition = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position($1,$2)",
    [statusQuote.id_branch, statusQuote.position || null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionSelect = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_select($1,$2)",
    [statusQuote.id_branch, statusQuote.position_select || null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionReport = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;

  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_report($1,$2)",
    [statusQuote.id_branch, statusQuote.position_report || null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionCalls = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.query;

  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_calls($1,$2)",
    [statusQuote.id_branch, statusQuote.position_calls || null],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const RegistrarPositionCalls = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.body;

  await pool.query(
    "SELECT * FROM function_quote_status_insertar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      statusQuote.name,
      statusQuote.position,
      statusQuote.position_select,
      statusQuote.position_report,
      statusQuote.position_calls,
      statusQuote.status_calls,
      statusQuote.status_calls_all,
      statusQuote.description,
      statusQuote.status,
      statusQuote.id_branch,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const validatePositionActualizar = async (
  req: Request,
  res: Response
) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_actualizar($1,$2,$3)",
    [statusQuote.id_branch, statusQuote.position || null, statusQuote.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionSelectActualizar = async (
  req: Request,
  res: Response
) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_select_actualizar($1,$2,$3)",
    [
      statusQuote.id_branch,
      statusQuote.position_select || null,
      statusQuote.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionReportActualizar = async (
  req: Request,
  res: Response
) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_report_actualizar($1,$2,$3)",
    [
      statusQuote.id_branch,
      statusQuote.position_report || null,
      statusQuote.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
export const validatePositionCallsActualizar = async (
  req: Request,
  res: Response
) => {
  const statusQuote: iStatusQuote = req.query;
  await pool.query(
    "SELECT * FROM function_statusquote_validar_position_calls_actualizar($1,$2,$3)",
    [statusQuote.id_branch, statusQuote.position_calls || null, statusQuote.id],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};

export const ActualizarPositionCalls = async (req: Request, res: Response) => {
  const statusQuote: iStatusQuote = req.body;

  await pool.query(
    "SELECT * FROM function_quote_states_actualizar($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [
      statusQuote.name,
      statusQuote.position,
      statusQuote.position_select,
      statusQuote.position_report,
      statusQuote.position_calls,
      statusQuote.status_calls,
      statusQuote.status_calls_all,
      statusQuote.description,
      statusQuote.status,
      statusQuote.id,
    ],
    (err, response, fields) => {
      if (!err) {
        let rows = response.rows;
        res.json({
          status: 200,
          statusBol: true,
          mensaje: rows[0].mensaje,
          estadoflag: rows[0].estadoflag,
          data: rows,
        });
      } else {
        console.log(err);
      }
    }
  );
};
