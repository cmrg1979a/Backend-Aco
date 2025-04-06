import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.TOKEN_SECRET || "tokentest"; // Utiliza una clave por defecto si no se proporciona en el archivo .env
export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).json("Access denied");
  try {
    const payload = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.json({
      status: 401,
      statusBol: false,
      estadoflag: false,
      mensaje: "Sesión Expirada",
    });
    console.log(error);
  }
};

export class AuthService {
  static generateToken(userId: any): string {
    return jwt.sign({ userId }, secretKey, { expiresIn: "36h" });
  }

  static verifyToken(token: string): number | null {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload as any;
    } catch (error) {
      return null;
    }
  }
}
