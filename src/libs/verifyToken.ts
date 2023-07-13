import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json("Access denied");
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest");
    next();
  } catch (error) {
    res.json({
      status: 500,
      statusBol: false,
      estadoflag: false,
      mensaje: "Sesión Expirada",
    });
    console.log(error);
  }

  //console.log(payload);
};
