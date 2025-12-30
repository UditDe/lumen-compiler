import type { Request, Response, NextFunction } from "express";

export const error_handler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Fallback for unknown / unhandled errors
  console.error(err);

  const message =
    err instanceof Error ? err.message : "Internal Server Error";

  return res.status(500).json({
    success: false,
    message,
  });
};

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Restore prototype chain (important for TS)
    Object.setPrototypeOf(this, new.target.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Conflict") {
    super(message, 409);
  }
}

