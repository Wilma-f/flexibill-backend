import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("❌ JWT_SECRET not set in environment");
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith(" Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    if (typeof decoded !== "object" || !("id" in decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.userId = (decoded as { id: string }).id;
    next();
  } catch (err: any) {
    console.error("JWT error:", err.message);
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};
