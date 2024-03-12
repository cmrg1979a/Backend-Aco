import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthService } from "../libs/verifyToken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const userId = AuthService.verifyToken(token);
    if (userId !== null) {
      req["userId"] = userId;
      next();
    } else {
      res.status(401).json({
        status: 401,
        mensaje: "Token Invalido",
        estadoflag: false,
        data: [],
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      mensaje: "Token no proporcionado",
      estadoflag: false,
      data: [],
    });
  }
}

// Middleware para la renovación automática del token
export function renewTokenMiddleware(req: Request) {
  const token = req.header("auth-token");

  if (token) {
    const userId = AuthService.verifyToken(token);

    if (userId !== null) {
      const newToken = AuthService.generateToken(userId);
      return newToken;
    } else {
      return null;
    }
  }
}
